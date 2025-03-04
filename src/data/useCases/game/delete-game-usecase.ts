import { DeleteGameUseCaseInterface } from 'src/data/abstract/game/delete-game-interface';
import { GameRepositoryInterface } from 'src/infra/repositories/abstract/game-repository-interface';

export class DeleteGameUseCase implements DeleteGameUseCaseInterface {
  constructor(private readonly repository: GameRepositoryInterface) {}

  async execute(id: string): Promise<boolean> {
    const deletedGame = await this.repository.delete(id);
    if (deletedGame) {
      return true;
    } else {
      return false;
    }
  }
}
