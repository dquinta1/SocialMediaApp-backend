# SocialMediaApp-backend

This is a temporary repo to implement the backend for the SocialMediaApp project

### TODOs (by priority)

#### Validate Feed Actions

- Unit test to validate GET /headline
- Unit test to validate PUT /headline
- Unit test to validate GET /articles
- Unit test to validate GET /articles/id
- Unit test to validate POST /article

#### Implement Endpoints

- GET /headline/:user? returns the headline messages for requested users
- PUT /headline updates the headline message
- GET /articles returns articles for logged in user
- POST /article returns an array of articles with newly added article
- implement GET /articles and GET /articles/:id as one endpoint not two

#### Implement file/image upload functionality

- POST /article returns an array of articles with newly added article

#### Stub or Implement Remaining Endpoints

- Stub: PUT /password
- Stub: GET /email/:user?
- Stub: PUT /email
- Stub: GET /zipcode/:user?
- Stub: PUT /zipcode
- Stub: GET /avatar/:user?
- Stub: PUT /avatar
- Stub: GET /dob
- Stub: PUT /articles/id
- Stub: GET /following/:user?
- Stub: PUT /following/:user
- Stub: DELETE /following/:user
- Stub: POST /articles/:id/comment
- Stub: PATCH /articles/:id/comments/:index
- Stub: DELETE /articles/:id/comments/:index

#### Unit Tests for remaining endpoints (not required at this stage)

- Unit test to validate PUT /password
- Unit test to validate GET /email/:user?
- Unit test to validate PUT /email
- Unit test to validate GET /zipcode/:user?
- Unit test to validate PUT /zipcode
- Unit test to validate GET /avatar/:user?
- Unit test to validate PUT /avatar
- Unit test to validate GET /dob
- Unit test to validate PUT /articles/id
- Unit test to validate GET /following/:user?
- Unit test to validate PUT /following/:user
- Unit test to validate DELETE /following/:user
- Unit test to validate POST /articles/:id/comment
- Unit test to validate PATCH /articles/:id/comments/:index
- Unit test to validate DELETE /articles/:id/comments/:index
