const path = require('path');
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');
const FinancialTransactionService = require('../../services/FinancialTransactionService');
const categoryService = require('../../services/categoryService.js');

const generateStatementExcel = async (req, res) => {
  const { userId } = req.params;

  // Fetch user's transactions from the database
  const transactions = await FinancialTransactionService.getTransactionsByUserId(userId);

  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Statement');

  // Add columns
  worksheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Type', key: 'type', width: 10 },
    { header: 'Amount', key: 'amount', width: 10 },
    { header: 'Category', key: 'category', width: 15 },
    { header: 'Description', key: 'description', width: 30 },
    { header: 'Canceled', key: 'canceled', width: 10 },
  ];

  // Get categories of user and save them in a data structure
  let categories = await categoryService.getCategoriesByUserId(userId);
  let listStructs = categories.map(cat => ({
    categoryId: cat.id,
    categoryname: cat.name,
    type: cat.type,
  }));

  //console.log(categories);
  //console.log(listStructs);
  //console.log(transactions);

  // Prepare table rows
  const tableRows = transactions.map(transaction => [
    new Date(transaction.transactionDate).toISOString().split('T')[0],
    listStructs.find(c => c.categoryId === transaction.categoryId).type === 'E' ? "Expense" : "Income",
    transaction.amount,
    listStructs.find(c => c.categoryId === transaction.categoryId).categoryname,
    transaction.description,
    transaction.canceled === true ? "Yes" : "No",
  ]);

  // Apply table formatting
  worksheet.addTable({
    name: 'TransactionTable',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium9', // Using a light table style
      showRowStripes: true, // Disable row stripes
    },
    columns: [
      { name: 'Date', key: 'date' },
      { name: 'Type', key: 'type' },
      { name: 'Amount', key: 'amount' },
      { name: 'Category', key: 'category' },
      { name: 'Description', key: 'description' },
      { name: 'Canceled', key: 'canceled' },
    ],
    rows: tableRows,
  });

  const filePath = path.join(__dirname, `statement_${userId}.xlsx`);
  await workbook.xlsx.writeFile(filePath);

  // Send the file path to the frontend
  res.status(200).json({ filePath });
};

const sendStatementEmail = async (req, res) => {
  const { userId, email, name } = req.body;

  // Generate the statement file
  let filePath;
  const mockRes = {
    status: (code) => ({
      json: (data) => { filePath = data.filePath; }
    })
  };

  await generateStatementExcel({ params: { userId } }, mockRes);

  // Ensure the file path was generated correctly
  if (!filePath) {
    return res.status(500).json({ error: 'Error generating file' });
  }

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cs35lproject.fruit17@gmail.com',
      pass: 'oqhi bsdw tnrp rbpd', // Use the App Password
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'cs35lproject.fruit17@gmail.com',
    to: email,
    subject: 'Your Statement from Budget Buddy',
    text: `Hi ${name}! Please find your statement attached.`,
    attachments: [
      {
        filename: `statement_${name}.xlsx`,
        path: filePath,
      },
    ],
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
};

module.exports = {
  generateStatementExcel,
  sendStatementEmail
};
