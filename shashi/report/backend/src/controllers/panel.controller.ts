import { Get, Route, Tags, Post, Body, Path, Put, Request } from "tsoa";
import { Panel } from "../models/panels";
import {
  IPanelPayload,
  getPanels,
  getPanel,
  updatePanel,
  createPanelMap,
} from "../repositories/panel.repository";

@Route("panels")
@Tags("panel")
export default class PanelController {
  @Get("/")
  public async getPanels(): Promise<Array<Panel>> {
    return getPanels();
  }

  @Get("/:id")
  public async getPanel(@Path() id: string) {
    return getPanel(Number(id));
  }

  @Put("/")
  public async updatePanel(@Body() body: IPanelPayload): Promise<Panel> {
    return updatePanel(body);
  }

  @Post("/")
  public async createPanelMap(
    @Request() map: Map<string, string>
  ): Promise<Panel> {
    return createPanelMap(map);
  }
}