module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
    // [
    //   '@babel/preset-env',
    //   {
    //     'useBuiltIns': 'usage',
    //     'corejs': 3
    //   }
    // ]
  ],
  'plugins': [
    // '@babel/plugin-transform-runtime',
    ['import', {
      'libraryName': 'ant-design-vue',
      'libraryDirectory': 'es',
      'style': 'true'
    }
    ]
    // `style: true` 会加载 less 文件
  ]
}
