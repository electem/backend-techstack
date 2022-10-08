import {createPanelData, getPanelData} from '../repositories/paneldata.repository'
import {Route, Tags,  Post, Body, Get} from "tsoa";
import {PanelData} from '../models/paneldata'

@Route("paneldata")
@Tags("paneldata")
export default class PanelDataController {
  
  @Post("/")
  public async createPanelData(@Body() body: any):  Promise<PanelData> {
    return createPanelData(body)
  } 

  @Get("/")
  public async getPanelData(): Promise<Array<PanelData>> {
    return getPanelData();
  }
}