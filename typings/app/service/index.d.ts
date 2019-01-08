// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/service/home';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    home: ExportHome;
    test: ExportTest;
  }
}
