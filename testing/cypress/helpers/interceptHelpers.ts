
export const getMockRequest = (method: any, status: any, fullPath: any, responseJson: any, alias = 'getMockRequest')=>{
    cy.intercept(`${method}`,fullPath,{statusCode: status, body:typeof responseJson === 'string' ? `${responseJson}` : responseJson,}).as(alias)
}