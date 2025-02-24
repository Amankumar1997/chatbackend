const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        validate: {
            validator: function(v) {
              const words=  v.trim().split(/\s+/).length;
              return words===25
            },
            message: props => `Atleast 25 words required!`
          },
      },
    startDate: {
      type: String || Date,
      required: true,
      unique: true,
    },
    endDate: {
      type: String || Date,
    },

    // contributors:Array,
    // associatedWith:String
  },
  { timestamps: true }
);
const Projects = new mongoose.model("Projects", ProjectSchema);
module.exports = Projects;
