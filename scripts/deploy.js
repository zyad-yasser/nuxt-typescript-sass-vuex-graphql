const fs = require("fs");
const path = require("path");
const exec = require('child_process').exec;
const envName = process.env.npm_config_env;
const rimraf = require("rimraf");

const copyFile = (from, to) => {
  return new Promise((resolve, reject) => {
    return fs.copyFile(from, to, (err) => {
      if (err) {
        return reject(err);
      }
        return resolve();
      }
    );
  });
}

const tasks = [
  {
    name: 'Reading environment variables',
    async method() {
      return new Promise(async(resolve, reject) => {
        try {
          console.log(this.name);
          const dir = path.join(__dirname + '/../src/backup/');
          const dir1 = path.join(__dirname + '/../public/_nuxt/');
          const dir2 = path.join(__dirname + '/../.nuxt/');
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          if (!fs.existsSync(dir1)){
            fs.mkdirSync(dir1);
          }
          if (!fs.existsSync(dir2)){
            fs.mkdirSync(dir2);
          }
          const fromIndexToBackup = path.join(__dirname + '/../environment/index.ts');
          const toIndexToBackup = path.join(__dirname + '/../environment/backup/index.ts');
          const fromEnvToIndex = path.join(__dirname + '/../environment/' + `index.${envName}.ts`);
          const toEnvToIndex = path.join(__dirname + '/../environment/index.ts');
          await copyFile(fromIndexToBackup, toIndexToBackup);
          await copyFile(fromEnvToIndex, toEnvToIndex);
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
  {
    name: 'Building Nuxt application',
    method() {
      return new Promise((resolve, reject) => {
        try {
          console.log(this.name);
          exec('npm run build', () => {
            return resolve();
          });
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
  {
    name: 'Arrange files for Firebase deployment',
    method() {
      return new Promise((resolve, reject) => {
        try {
          console.log(this.name);
          exec('npm run build:arrange', () => {
            return resolve();
          });
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
  {
    name: 'Install dependancies',
    method() {
      return new Promise((resolve, reject) => {
        try {
          console.log(this.name);
          exec('npm run build:install', () => {
            return resolve();
          });
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
  {
    name: 'Deploying to firebase',
    method() {
      return new Promise((resolve, reject) => {
        try {
          console.log(this.name);
          exec('npm run deploy:firebase', () => {
            return resolve();
          });
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
  {
    name: 'Cleaning up',
    method() {
      return new Promise(async(resolve, reject) => {
        try {
          console.log(this.name);
          const fromBackupToIndex = path.join(__dirname + '/../environment/backup/index.ts');
          const toBackupToIndex = path.join(__dirname + '/../environment/index.ts');
          await copyFile(fromBackupToIndex, toBackupToIndex);
          await rimraf.sync(path.join(__dirname + '/../environment/backup'));
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }
  },
]

const main = async () => {
  try {
    await tasks[0].method();
    await tasks[1].method();
    await tasks[2].method();
    await tasks[3].method();
    await tasks[4].method();
    await tasks[5].method();
  } catch (error) {
    // await tasks[5].method();
    console.log(error);
  }
}

main();
