class Env {
  static isDevelopment: boolean = process.env.NODE_ENV === 'development';
  static isProduction: boolean = process.env.NODE_ENV === 'production';
}

export default Env;
