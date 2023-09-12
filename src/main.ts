import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import * as WebIFC from "web-ifc";
import * as fs from 'fs';
import * as path from "path";
import { fileURLToPath } from 'url';

const ifcApi = new WebIFC.IfcAPI(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4444;

(async function initServer() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    rawBody: true,
  });

  fs.readFile( path.join( __dirname, '../assets/minimalWall.ifc'), async (err, data) => {
    if(err) throw err;
    let rawFileData = new Uint8Array(data);

    await ifcApi.Init();
    ifcApi.SetWasmPath( path.join( __dirname, "../assets/wasm/") ); 

    let modelID = ifcApi.OpenModel(rawFileData);

    console.log( modelID );
    
})

  console.log('[NEST IFC]')

})();
