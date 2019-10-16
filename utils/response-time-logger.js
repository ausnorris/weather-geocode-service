// response-time-logger.js
const metrics = require('wavefrontmetrics');
const registry = new metrics.Registry();
const DEPLOYMENTID = "var.deployment."+process.env.DEPLOYMENT_ID || "vra.node.testing.new";
const WAVEFRONT_TOKEN = process.env.WAVEFRONT_TOKEN
const prefix = DEPLOYMENTID +".nodejs.geocode";
const hostId = process.env.HOST_ID

const directReporter = new metrics.WavefrontDirectReporter(registry, prefix,  "surf.wavefront.com", WAVEFRONT_TOKEN, { 'app': "vra.app.weather", 'source': hostId + "-" +DEPLOYMENTID+"-geocode"});
directReporter.start(5000);
const c = new metrics.Counter();
registry.addTaggedMetric("request.time", c, {"vra.service":"geocode"});


function logResponseTime(req, res, next) {
    const startHrTime = process.hrtime();
  
    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      console.log("%s : %fms", req.path, elapsedTimeInMs);
      c.clear()
      c.inc(elapsedTimeInMs);

    });

    next();
  }
  
  module.exports = logResponseTime;