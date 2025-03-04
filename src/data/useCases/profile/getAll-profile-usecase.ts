import { GetAllProfilesUseCaseInterface } from '../../abstract/profile/getAll-profile-interface';
import { ProfileRepositoryInterface } from 'src/infra/repositories/abstract/profile-repository-interface';
import { ProfileEntityInterface } from 'src/domain/entities/profile-entity-interface';

export class GetAllProfilesUseCase implements GetAllProfilesUseCaseInterface {
  constructor(private readonly repository: ProfileRepositoryInterface) {}

  async execute(): Promise<ProfileEntityInterface[] | []> {
    return await this.repository.getAll();
  }
}
