const cache = {
  materials: [],
  ranges: null,
  brands: {},
  models: {},
  modelsData: {},
  colorsByMaterials: {},

  _relations: {
    brandsByMaterial: {},
    modelsByBrand: {},
    modelsByMaterial: {}
  },

  setModels(models, materialId, brandId) {
    for (const model of models) {
      const modelId = model.id;

      if (!this._relations.modelsByMaterial[materialId]) {
        this._relations.modelsByMaterial[materialId] = [];
      }
      if (!this._relations.modelsByBrand[brandId]) {
        this._relations.modelsByBrand[brandId] = [];
      }

      this._relations.modelsByMaterial[materialId].push(modelId);
      this._relations.modelsByBrand[brandId].push(modelId);
      this.models[modelId] = model;
    }
  },
  getModels(materialId, brandId) {
    const modelsByBrand = this._relations.modelsByBrand[brandId] || [];
    const modelsByMaterial = this._relations.modelsByMaterial[materialId] || [];
    const models = Object.keys(this.models).map(modelId => {
      modelId = parseInt(modelId);
      if (
        modelsByBrand.includes(modelId) &&
        modelsByMaterial.includes(modelId)
      ) {
        return this.models[modelId];
      }
    });

    return models;
  },

  setBrandsRelatedToMaterial(brands, materialId) {
    this._relations.brandsByMaterial[materialId] = new Set();
    brands.forEach(brand => {
      this.brands[brand.id] = brand;
      this._relations.brandsByMaterial[materialId].add(brand.id);
    });
  },

  getBrandsByMaterial(materialId) {
    const brands = [];
    const brandsByMaterial = this._relations.brandsByMaterial[materialId];

    if (brandsByMaterial) {
      brandsByMaterial.forEach(brandID => {
        brands.push(this.brands[brandID]);
      });
    }

    return brands;
  }
};

export default cache;
