const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const ComplaintSchema = new mongoose.Schema({
    createdOn: {
        type: Date
    },
    caseTitle: {
        type: String
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
    },
    status: {
        type: String
    },
    owner: {
        type: String
    },
    caseID: {
        type: String
    },
    solutionResource: {
        type: String
    },
    vendor: {
        type: String
    },
    product: {
        type: String
    },
    productIssue: {
        type: String
    },
    dealer: {
        type: String
    },
    contractor: {
        type: String
    },
    priority: {
        type: String
    },
    caseNumber: {
        type: String
    },
    solutionResourceDesc: {
        type: String
    }
});

// Geocode & create location
ComplaintSchema.pre('save', async function(next) {
    
    if(this.caseTitle === undefined) {
        next();
    } else {
        const loc = await geocoder.geocode(this.caseTitle);
        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress
        }
        next();
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);