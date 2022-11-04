import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import * as pdf from 'html-pdf';

@Injectable()
export class CompanyService2 {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public async Distil(file: string) {
    return new Promise((resolve, reject) => {
      const text = fs.readFileSync('../../src/mails/electems.pdf', 'utf8');
      const template = Handlebars.compile(text);
      const html = template(template);

      pdf.create(html).toBuffer((err, buffer) => {
        if (err) reject(err);

        resolve(buffer);
      });
    });
  }
}
