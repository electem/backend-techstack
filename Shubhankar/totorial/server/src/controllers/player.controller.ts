import { Route, Tags,  Post, Body, Get, Path} from "tsoa";
import {Player} from '../models/player'
import {IPlayerPayload ,createPlayer, getPlayer, getPlayers } from "../repositories/player.repository"

@Route("players")
@Tags("players")
export class PlayerController {


  @Post("/")
  public async createPlayer(@Body() body: IPlayerPayload): Promise<Player> {
    return  createPlayer(body)
  }
  @Get("/")
  public async getPlayers (): Promise<Array<Player>> {
    return getPlayers ()
  }
  @Get("/:id")
  public async getPlayer(@Path() id: string): Promise<Player | null> {
    return getPlayer(Number(id))
  }
}