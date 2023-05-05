const { generateService } = require('@umijs/openapi')

const axiosConfigPath: string = 'import request from \'@/config/axios.config\''

const apiConfigList = [
  // {
  //   requestLibPath: axiosConfigPath,
  //   schemaPath: 'http://localhost:7529/api/v2/api-docs',
  //   serversPath: './src/services',
  //   projectName: 'user-service',
  // },
  {
    requestLibPath: axiosConfigPath,
    schemaPath: 'http://localhost:7539/api/v2/api-docs',
    serversPath: './src/services',
    projectName: 'interface-service',
  },
]

apiConfigList.forEach((apiConfig) => {
  generateService(apiConfig).then((r: any) => {
    if (r) {
      console.log(r)
    }
  })
})
