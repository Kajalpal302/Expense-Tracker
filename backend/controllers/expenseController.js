const xlsx = require('xlsx');
const Expense = require("../models/Expense");
const Tesseract = require("tesseract.js");
const sharp = require("sharp")
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");


//gemini client
const genAI = new GoogleGenerativeAI(
   process.env.GEMINI_API_KEY
);
console.log("API KEY:", process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
   model: "gemini-2.5-flash",
});
//Add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    
    try{

        console.log(req.file);
    console.log(req.body);
    
     //Taking text from receipt
    let extractedText = "";
    if(req.file) {

        // Image processing using sharp
    const processedImagePath  = `processed-${req.file.filename}.png`;

    await sharp(req.file.path)
       .resize(2200)
       .grayscale()
       .normalize()
       .sharpen()
       .threshold(150)
       .png()
       .toFile(processedImagePath);


        const result = await Tesseract.recognize(
            processedImagePath,
            "eng"
        );
        extractedText = result.data.text;
        await fs.promises.unlink(processedImagePath);
        await fs.promises.unlink(req.file.path);
        console.log("OCR TEXT:");

        console.log(extractedText);
    }
    // AI Extraction using Gemini
let aiData = {};

if (extractedText) {

    const prompt = `
    Extract the following details from this receipt text.

    Return ONLY valid JSON.

    {
      "amount": "",
      "category": "",
      "date": ""
    }

    Receipt Text:
    ${extractedText}
    `;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log("GEMINI RESPONSE:");
    console.log(responseText);
  try{
    aiData = JSON.parse(
      responseText.replace(/```json|```/g, "").trim()
    );
} catch(err) {
     console.log("JSON Parse Error:" , err);
     aiData = {};
}

   
}

    //Amount detection
//     const amountMatch = extractedText.match(
//  /(?:₹|rs\.?|inr)?\s?(\d{2,6}(\.\d{1,2})?)/i
// );
//     const detectedAmount = amountMatch 
//     ? amountMatch[1]
//     : "";
//     console.log(detectedAmount);
   //Date detect

//   const dateMatch = extractedText.match(
//  /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s\d{1,2},\s\d{4}/i
// );

//     const detectedDate = dateMatch 
//     ? new Date(dateMatch[0])
//     : null;

//     console.log(detectedDate);

    //Category Detect

//     let detectedCategory = "Other";

//     const text = extractedText.toLowerCase();

//     if(
//         text.includes("zomato") ||
//         text.includes("swiggy") ||
//         text.includes("food")
//     ) {
//         detectedCategory = "Food";
//     }
//     else if (
//         text.includes("uber") ||
//         text.includes("ola")
//     ) {
//           detectedCategory = "Travel";
//     }
//     else if(
//          text.includes("myntra") ||
//          text.includes("savana") ||
//           text.includes("meesho") ||
//            text.includes("flipkart") ||
//             text.includes("Amazon") 
//     ) {
//         detectedCategory = "Shopping";
//     }
//     else if(
//    text.includes("medicine") ||
//    text.includes("hospital")
// ) {
//    detectedategory = "Health";
// }

// console.log(detectedCategory);


   

        const { icon, category , amount, date } = req.body;

        //Validation check for missing fields
        if (
  !req.file &&
  (!category || !amount || !date)
) {
  return res.status(400).json({
    message: "All fields required",
  });
}

        const newExpense = new Expense ({
           userId,
           icon: icon || null, 
          category: category || aiData.category || null,

           amount: Number(amount || aiData.amount) || null,

           date: date
              ? new Date(date)
               : aiData.date
               ? new Date(aiData.date)
               : null,
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error){
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
}
};
//get All Expense 
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense
            .find({ userId })
            .sort({ date: -1 });
        res.json(expense);
    } catch (error){
        res.status(500).json({ message: "Server Error"});
    }
}
//delete Expense
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
}
//download  Expense Excel 
exports. downloadExpenseExcel= async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));
 
        //work file create 
        const wb = xlsx.utils.book_new();

        //work sheet create 
        const ws = xlsx.utils.json_to_sheet(data);
        //append work sheet to work file 
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
}