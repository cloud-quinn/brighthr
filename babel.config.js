module.exports = {
    presets: [
        [
        '@babel/preset-env',
            {
                shippedProposals: true,
                useBuiltIns: 'usage',
                corejs: '3',
            }
        ],
      '@babel/preset-react',
    ], 
    plugins: [
        ['@babel/plugin-proposal-decorators',
            { 
                legacy: true,
            }
        ],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
    ],
}