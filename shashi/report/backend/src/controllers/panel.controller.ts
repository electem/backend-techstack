import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { Request } from "node-fetch";
import { Get, Route, Tags, Post, Body, Path, Put } from "tsoa";
import { Panel } from "../models/panels";
import {
  IPanelPayload,
  getPanels,
  // createPanel,
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

  // @Post("/")
  // public async createPanel(@Body() body: IPanelPayload): Promise<Panel> {
  //   return createPanel(body);
  // }

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
    @Param() map: Map<string, string>
  ): Promise<Panel> {
    return createPanelMap(map);
  }
}
