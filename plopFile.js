const config = plop => {
  plop.setGenerator('components', {
    description: 'A component generator for the app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.tsx',
        templateFile: 'plop/templates/components/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.module.scss',
        templateFile: 'plop/templates/components/component.module.hbs',
      },
    ],
  });
};

module.exports = config;
