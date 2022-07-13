var AWS = require("aws-sdk");
var core = require("@actions/core");

try {
  var awsRegion = core.getInput("aws-region");
  var awsAccessKey = core.getInput("aws-access-key-id");
  var awssecretKey = core.getInput("aws-secret-access-key");
  var pipelineName = core.getInput("pipeline-name");

  // AWS Configuration
  new AWS.config({
    accessKeyId: awssecretKey,
    secretAccessKey: awsAccessKey,
    region: awsRegion
  });

  var codepipeline = new AWS.CodePipeline({
    region: awsRegion,
  });

  var pipeline = {
    name: pipelineName,
  };

  codepipeline.startPipelineExecution(pipeline, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
