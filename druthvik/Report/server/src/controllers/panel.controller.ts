import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { Panel } from '../models/panel';
import {
  getPanel,
  IPanelPayload,
  createPanel,
  getPanels,
  updatePanel,
} from '../repositories/panel.repository';

@Route('panels')
@Tags('Panel')
export default class PanelController {
  @Get('/')
  public async getPanel(): Promise<Array<Panel>> {
    return getPanels();
  }

  @Post('/')
  public async createPanel(@Body() body: IPanelPayload): Promise<Panel> {
    return createPanel(body);
  }

  @Get('/:id')
  public async getPanelByID(@Path() id: string): Promise<Panel | null> {
    return getPanel(Number(id));
  }

  @Put('/')
  public async updatePanel(@Body() body: IPanelPayload): Promise<Panel> {
    return updatePanel(body);
  }
}
