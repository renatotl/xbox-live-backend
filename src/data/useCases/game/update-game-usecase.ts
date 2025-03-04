import { ProfileDto } from 'src/domain/dtos/profile-dto';
import { UpdateGameUseCaseInterface } from 'src/data/abstract/game/update-game-interface';
import { GameRepositoryInterface } from 'src/infra/repositories/abstract/game-repository-interface';
import { InvalidParamError } from 'src/utils/errors';
import { GameEntity } from 'src/entities/game-entity';

export class UpdateGameUseCase implements UpdateGameUseCaseInterface {
  constructor(private readonly repository: GameRepositoryInterface) {}

  async execute(body: ProfileDto, id: string): Promise<boolean> {
    const foundGame = await this.repository.getOne(id);

    if (foundGame) {
      const updatedBody = new GameEntity(Object.assign(foundGame, body));
      const updatedGame = await this.repository.update(
        updatedBody.getBody(),
        id,
      );

      if (updatedGame) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new InvalidParamError('ID');
    }
  }
}
