import { Get, Route, Tags, Post, Body, Path, Put ,Request} from "tsoa";
import { Panel } from "../models/panel";
import {IPanelPayload,getPanels,getPanel,updatePanel,createMap} from "../repositories/panel.repository";

@Route("panels")
@Tags("panel")
export default class PanelController {
  @Get("/")
  public async getPanels(): Promise<Array<Panel>> {
   return getPanels();
  }
 @Post("/")
  public async createPanel(@Request() map:Map<String,String>): Promise<Panel> {  
    console.log("Before "+map);
    const map1 = new Map(Object.entries(map));  
    let panel = new Panel();
    panel.name =map1.get("name");
    panel.description =map1.get("description");
    return createMap(panel);
}
@Get("/:id")
  public async getPanel(@Path() id: string) {
    return getPanel(Number(id));
  }
@Put("/")
  public async updatePanel(@Body() body: IPanelPayload): Promise<Panel> {
    return updatePanel(body);
  }
}
