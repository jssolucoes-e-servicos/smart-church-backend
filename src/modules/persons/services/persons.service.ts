// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { ResponseResultsHelper } from 'src/commons/helpers/response-results.helper';
import { findWithNameType } from 'src/modules/persons/@types/person';
import { PersonsCreateDTO } from 'src/modules/persons/dto/persons.create.dto';
import { PersonsUpdateDTO } from 'src/modules/persons/dto/persons.update.dto';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class PersonsService {
  constructor(private readonly prisma: PrismaService) {}
  private collection = 'Persons';

  async create(churchId: string, data: PersonsCreateDTO) {
    const dataExists = await this.prisma.person.findFirst({
      where: {
        churchId: churchId,
        email: data.email,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists(this.collection);
    }

    let dataToInsert = data;
    if (dataToInsert.password) {
      dataToInsert = {
        ...dataToInsert,
        password: await hash(data.password, 10),
      };
    }

    const person = await this.prisma.person.create({
      data: {
        ...dataToInsert,
        church: {
          connect: { id: churchId },
        },
      },
    });

    return {
      ...person,
      password: undefined,
    };
  }

  async findGlobal() {}

  async findAll(churchId: string) {
    return await this.prisma.person.findMany({
      where: {
        churchId,
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        church: true,
        PersonDocument: true,
        PersonAddress: true,
        PersonPhone: true,
        CellsNetwork: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        CourseEvaluationProgress: {
          select: {
            id: true,
            stap: true,
            createdAt: true,
            evaluation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        StudantOnClass: {
          select: {
            class: {
              select: {
                id: true,
                name: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        Cell: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.person.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        church: true,
        PersonDocument: true,
        PersonAddress: true,
        PersonPhone: true,
        Teacher: {
          select: {
            bio: true,
          },
        },
        CellsNetwork: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        CourseEvaluationProgress: {
          select: {
            id: true,
            stap: true,
            createdAt: true,
            evaluation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        StudantOnClass: {
          select: {
            class: {
              select: {
                id: true,
                name: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        Cell: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findWithName(churchId: string, data: findWithNameType) {
    const persons = await this.prisma.person.findMany({
      where: {
        churchId: churchId,
        name: {
          contains: data.name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        PersonDocument: true,
        Teacher: {
          select: {
            bio: true,
          },
        },
        CellsNetwork: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        CourseEvaluationProgress: {
          select: {
            id: true,
            stap: true,
            createdAt: true,
            evaluation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        StudantOnClass: {
          select: {
            class: {
              select: {
                id: true,
                name: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        Cell: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return persons;
  }

  async findByEmail(email: string): Promise<any> {
    const person = await this.prisma.person.findFirst({ where: { email } });
    return person;
  }

  async verifyPasswordToUnlock(personId: string, userPassword: string) {
    const person = await this.prisma.person.findUnique({
      where: {
        id: personId,
      },
    });
    if (person) {
      const isPasswordValid = await compare(userPassword, person.password);
      if (isPasswordValid) {
        return true;
      } else {
        return false;
      }
    }
  }

  async findByUsernameToLogin(username: string, churchId: string) {
    const person = await this.prisma.person.findFirst({
      where: { username, churchId },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        password: true,
        loginAttempts: true,
        loginStats: true,
        inRecovery: true,
        twoFactorAuthentication: true,
        permitChurch: true,
        permitEAD: true,
        permitPortal: true,
        dizimist: true,
        member: true,
        singnedAt: true,
        PersonDocument: true,
        PersonAddress: true,
        PersonPhone: true,
        church: {
          select: {
            id: true,
            name: true,
            fantasy: true,
            image: true,
          },
        },
        Cell: true,
      },
    });
    return person;
  }

  async update(id: string, data: PersonsUpdateDTO) {
    const dataExists = await this.prisma.person.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists('Person');
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    await this.prisma.person.update({
      data,
      where: { id },
    });

    return 'ok';
  }

  async delete(id: string) {
    const personExists = await this.prisma.person.findUnique({
      where: {
        id,
      },
    });
    if (!personExists) {
      throw new Error('User does not exixts');
    }
    return await this.prisma.person.delete({
      where: {
        id,
      },
    });
  }
}
