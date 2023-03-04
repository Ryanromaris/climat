import Env from '../constant/Env';

class URLService {
  private static DevelopmentHost = 'http://localhost:8080';
  private static ProductionHost =
    'http://ec2-3-35-235-130.ap-northeast-2.compute.amazonaws.com:8080';

  static DefaultAPI = (...paths: (string | number)[]): string =>
    Env.isProduction
      ? URLService.ProductionHost + paths.join('')
      : URLService.DevelopmentHost + paths.join('');
}

export default URLService;
