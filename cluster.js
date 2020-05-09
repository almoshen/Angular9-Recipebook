const cluster = require('cluster');
require('dotenv').config();
const throng = require('throng');
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const clustertype = process.env.CLUSTER_TYPE || '0';

switch(clustertype) {
  case '0':
    console.log(`start using cluster type ${clustertype}`);
    require('./app');
    break;
  case '1':
    console.log(`start using cluster type ${clustertype}`);
    execCluster();
    break;
  case '2':
    console.log(`start using cluster type ${clustertype}`);
    execThrong();
    break;
  default:
    console.log('something goes wrong');
}

function execCluster() {
    if (cluster.isMaster) {
      // Count the machine's CPUs
      var cpuCount = require('os').cpus().length;
      console.log(`Forking ${cpuCount} CPUs`);
      
    
      // Create a worker for each CPU
      for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
      }
    
      // Listen for dying workers
      cluster.on('exit', function () {
        cluster.fork();
      });
    } else {
      require('./app');
    }
  };
  
function execThrong() {
  throng({
    workers: WORKERS,
    lifetime: Infinity,  // ms to keep cluster alive (Infinity)
    master: startMaster,
    start: startWorker
  });
  
  // This will only be called once
  function startMaster() {
    console.log('Started master');
  }
  
  // This will be called four times
  function startWorker(id) {
    console.log(`Started worker ${ id }`);
    require('./app');
    process.on('SIGTERM', () => {
      console.log(`Worker ${ id } exiting...`);
      console.log('(cleanup would happen here)');
      process.exit();
    });
  }
};

