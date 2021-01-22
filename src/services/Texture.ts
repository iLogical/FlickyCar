export default class Texture {
  static FromCache(name: string): PIXI.BaseTexture {
    let resource = PIXI.utils.TextureCache[name];
    if (resource)
      return resource.baseTexture;
    return null;
  }

  static Load(name: string): string {
    return require(`../images/${name}`)
  }
}