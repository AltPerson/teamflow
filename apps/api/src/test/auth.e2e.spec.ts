import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';

import { AppModule } from '../app.module.js';

describe('register (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('register user', async () => {
    const email = `e2e-${Date.now()}@test.com`;
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    avatarUrl
    emailVerifiedAt
    createdAt
    updatedAt
  }
}
        `,
        variables: {
          input: {
            email,
            password: 'password123',
            displayName: 'Vlad',
          },
        },
      })
      .expect(200);

    expect(response.body.data.register.email).toBe(email);
    expect(response.body.data.register.displayName).toBe('Vlad');
    expect(response.body.data.register.id).toBeDefined();
  });

  it('returns error when email already exists', async () => {
    const email = `duplicate-${Date.now()}@test.com`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    avatarUrl
    emailVerifiedAt
    createdAt
    updatedAt
  }
}
        `,
        variables: {
          input: {
            email,
            password: 'password123',
            displayName: 'Vlad',
          },
        },
      })
      .expect(200);

    expect(response.body.data.register.email).toBe(email);
    expect(response.body.data.register.displayName).toBe('Vlad');
    expect(response.body.data.register.id).toBeDefined();

    const responseWithError = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    avatarUrl
    emailVerifiedAt
    createdAt
    updatedAt
  }
}
        `,
        variables: {
          input: {
            email,
            password: 'password123',
            displayName: 'Vlad',
          },
        },
      })
      .expect(200);

    expect(responseWithError.body.data).toBeNull();
    expect(responseWithError.body.errors[0].message).toBe(
      'User with this email already exists',
    );
  });

  it('returns validation error for invalid email', async () => {
    const responseWithError = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    avatarUrl
    emailVerifiedAt
    createdAt
    updatedAt
  }
}
        `,
        variables: {
          input: {
            email: 'not-email',
            password: 'password123',
            displayName: 'Vlad',
          },
        },
      })
      .expect(200);

    expect(responseWithError.body.data).toBeNull();
    expect(
      responseWithError.body.errors[0].extensions.originalError.message,
    ).toContain('email must be an email');
  });

  it('returns validation error for invalid password', async () => {
    const email = `e2e-${Date.now()}@test.com`;
    const responseWithError = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    avatarUrl
    emailVerifiedAt
    createdAt
    updatedAt
  }
}
        `,
        variables: {
          input: {
            email,
            password: 'pass2',
            displayName: 'Vlad',
          },
        },
      })
      .expect(200);

    expect(responseWithError.body.data).toBeNull();
    expect(
      responseWithError.body.errors[0].extensions.originalError.message,
    ).toContain('password must be longer than or equal to 8 characters');
  });
});
