import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Get, Route, Tags, Post, Path } from 'tsoa';
import { Panel } from '../models/panel';
import {
  createPanel,
  getPanel,
  getPanels,
} from '../repositories/panel.repository';

@Route('Panels')
@Tags('Panel')
export default class PanelController {
  @Get('/')
  public async getPanel(): Promise<Array<Panel>> {
    return getPanels();
  }

  @Post('/')
  public async createPanel(@Param() map: Map<string, string>): Promise<Panel> {
    return createPanel(map);
  }

  @Get('/:id')
  public async getPanelByID(@Path() id: string): Promise<Panel | null> {
    return getPanel(Number(id));
  }
}
