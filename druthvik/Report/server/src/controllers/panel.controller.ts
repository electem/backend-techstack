import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { updateExportSpecifier } from 'typescript';
import { Panel } from '../models/panel';
import {
  getPanel,
  createPanel,
  getPanels,
} from '../repositories/panel.repository';

@Route('panels')
@Tags('Panel')
export default class PanelController {
  @Get('/')
  public async getPanel(): Promise<Array<Panel>> {
    return getPanels();
  }

  // @Post('/')
  // public async createPanel(@Body() Body: IPanelPayload): Promise<Panel> {
  //   return createPanel(Body);
  // }
  @Post('/')
  public async createPanel(@Param() map: Map<string, string>): Promise<Panel> {
    return createPanel(map);
  }

  @Get('/:id')
  public async getPanelByID(@Path() id: string): Promise<Panel | null> {
    return getPanel(Number(id));
  }
}
