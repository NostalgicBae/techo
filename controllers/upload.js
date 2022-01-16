const Complaint = require('../models/Complaint');
const XLSX = require('xlsx');

// @desc Upload file
// @route POST /upload
// @access Public
exports.uploadFile = async (req, res, next) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let excel = req.files.excel;
            await excel.mv('./uploads/' + excel.name);

            const wb = XLSX.readFile('./uploads/AllComplaints2.xlsx');
            const ws = wb.Sheets[wb.SheetNames[0]];

            const data = XLSX.utils.sheet_to_json(ws);

            const newData = []

            for (let i = 0; i < data.length; i++) {

                const complaint = {
                    createdOn: data[i].CreatedOn,
                    caseTitle: data[i].CaseTitle,
                    status: data[i].Status,
                    owner: data[i].Owner,
                    caseID: data[i].CaseID,
                    solutionResource: data[i].SolutionResource,
                    vendor: data[i].Vendor,
                    product: data[i].Product1,
                    productIssue: data[i].ProductIssue1,
                    dealer: data[i].Dealer,
                    contractor: data[i].Contractor,
                    priority: data[i].Priority,
                    caseNumber: data[i].CaseNumber,
                    solutionResourceDesc: data[i].SolutionResourceDescription
                };
                newData.push(complaint);
                console.log(newData[i])

            };

            for (let i = 0; i < newData.length; i++) {
                await Complaint.create(newData[i]);
            };

            return res.status(200).json({
                success: true,
                data: store
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
