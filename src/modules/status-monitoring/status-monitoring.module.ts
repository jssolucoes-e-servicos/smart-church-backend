import { Global, Module } from '@nestjs/common';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { configLoaderHelper } from 'src/commons/helpers/config-loader.helper';

@Global()
@Module({
  imports: [
    StatusMonitorModule.forRoot({
      title: `${configLoaderHelper().application.name} | Versão: ${
        configLoaderHelper().application.version || '1.0.0'
      }`,
      socketPath: '/socket.io',
      port: configLoaderHelper().application.port || 3111,
      path: '/monitor/server',
      ignoreStartsWith: ['/api'],
      spans: [
        {
          interval: 1, // Every second
          retention: 60, // Keep 60 datapoints in memory
        },
        {
          interval: 5, // Every 5 seconds
          retention: 60,
        },
        {
          interval: 15, // Every 15 seconds
          retention: 60,
        },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
      healthChecks: [
        {
          protocol: 'http',
          host: 'localhost',
          path: '/docs',
          port: configLoaderHelper().application.port || 3111,
        },
        {
          protocol: 'http',
          host: 'localhost',
          path: '/monitor/queues',
          port: configLoaderHelper().application.port || 3111,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class StatusMonitoringModule {}
