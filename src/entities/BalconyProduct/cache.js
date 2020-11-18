const cache = {
  materials: [],
  ranges: null,
  brands: [],
  models: {},
  modelsData: {},
  colorsByModels: {},

  _relations: {
    brandsByMaterial: {},
    modelsByBrand: {}
  },

  setModels(models, brandId) {
    for (const model of models) {
      const modelId = model.id;

      if (!this._relations.modelsByBrand[brandId]) {
        this._relations.modelsByBrand[brandId] = [];
      }

      this._relations.modelsByBrand[brandId].push(modelId);
      this.models[modelId] = model;
    }
  },
  getModels(brandId) {
    const modelsByBrand = this._relations.modelsByBrand[brandId] || [];
    const models = Object.keys(this.models).map(modelId => {
      modelId = parseInt(modelId);
      if (modelsByBrand.includes(modelId)) {
        return this.models[modelId];
      }
    });

    return models;
  }
};

export default cache;
