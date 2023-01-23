import Env from '../constant/Env';

class URLService {
  private static DevelopmentHost = 'http://localhost:8080';
  private static ProductionHost = '';

  static DefaultAPI = (...paths: (string | number)[]): string =>
    Env.isProduction
      ? URLService.ProductionHost + paths.join('')
      : URLService.DevelopmentHost + paths.join('');
}

export default URLService;
