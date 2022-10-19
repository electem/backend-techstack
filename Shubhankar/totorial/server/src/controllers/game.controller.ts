import {createGame,getGame,getGames, updateGame} from '../repositories/game.repository'
import {Route, Tags,  Post, Body, Get, Path, Put} from "tsoa";
import {Games} from '../models/game'

@Route("games")
@Tags("games")
export default class GameController {
  
  @Post("/")
  public async createGame(@Body() body: any):  Promise<Games> {
    return createGame(body)
  } 

  @Get("/")
  public async getGames(): Promise<Array<Games>> {
    return getGames()
  }
  @Get("/:id")
  public async getGame(@Path() id: string) {
    return getGame(Number(id))
  }
  @Put("/")
  public async updateGame(@Body() body: any): Promise<Games> {
    return updateGame(body)
  } 
}