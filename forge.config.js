module.exports = {
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Joe Bloggs',
          homepage: 'https://example.com'
        }
      }
    }
  ],
};
