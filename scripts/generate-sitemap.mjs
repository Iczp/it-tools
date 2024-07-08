/* eslint-disable n/prefer-global/process */
/* eslint-disable arrow-parens */
import { createWriteStream } from 'node:fs';
import path from 'node:path';

import { SitemapStream, streamToPromise } from 'sitemap';

// 解析命令行参数
const args = process.argv.slice(2);
const hostArgIndex = args.indexOf('--host');
// if (hostArgIndex === -1 || !args[hostArgIndex + 1]) {
//   console.error('Error: --host argument is required');
//   process.exit(1);
// }
const hostname = args[hostArgIndex + 1] || 'https://gggga.com';

async function generateSitemap(hostname) {
  console.log('hostname:', hostname);

  // console.log('router:', router);
  const toolUrls = [
    '/',
    '/sitemap.xml',
    '/token-generator',
    '/hash-text',
    '/bcrypt',
    '/uuid-generator',
    '/ulid-generator',
    '/encryption',
    '/bip39-generator',
    '/hmac-generator',
    '/rsa-key-pair-generator',
    '/password-strength-analyser',
    '/pdf-signature-checker',
    '/date-converter',
    '/base-converter',
    '/roman-numeral-converter',
    '/base64-string-converter',
    '/base64-file-converter',
    '/color-converter',
    '/case-converter',
    '/text-to-nato-alphabet',
    '/text-to-binary',
    '/text-to-unicode',
    '/yaml-to-json-converter',
    '/yaml-to-toml',
    '/json-to-yaml-converter',
    '/json-to-toml',
    '/list-converter',
    '/toml-to-json',
    '/toml-to-yaml',
    '/url-encoder',
    '/html-entities',
    '/url-parser',
    '/device-information',
    '/basic-auth-generator',
    '/og-meta-generator',
    '/otp-generator',
    '/mime-types',
    '/jwt-parser',
    '/keycode-info',
    '/slugify-string',
    '/html-wysiwyg-editor',
    '/user-agent-parser',
    '/http-status-codes',
    '/json-diff',
    '/safelink-decoder',
    '/qrcode-generator',
    '/wifi-qrcode-generator',
    '/svg-placeholder-generator',
    '/camera-recorder',
    '/git-memo',
    '/random-port-generator',
    '/crontab-generator',
    '/json-prettify',
    '/json-minify',
    '/json-to-csv',
    '/sql-prettify',
    '/chmod-calculator',
    '/docker-run-to-docker-compose-converter',
    '/xml-formatter',
    '/yaml-prettify',
    '/ipv4-subnet-calculator',
    '/ipv4-address-converter',
    '/ipv4-range-expander',
    '/mac-address-lookup',
    '/mac-address-generator',
    '/ipv6-ula-generator',
    '/math-evaluator',
    '/eta-calculator',
    '/percentage-calculator',
    '/chronometer',
    '/temperature-converter',
    '/benchmark-builder',
    '/lorem-ipsum-generator',
    '/text-statistics',
    '/emoji-picker',
    '/string-obfuscator',
    '/text-diff',
    '/numeronym-generator',
    '/ascii-text-drawer',
    '/phone-parser-and-formatter',
    '/iban-validator-and-parser',
  ];

  // 定义网站的 URL
  const urls = toolUrls.map((x) => ({ url: x, changefreq: 'daily', priority: 1.0 }));

  // 创建一个写入 sitemap 的流
  const sitemapStream = new SitemapStream({ hostname, xslUrl: '/sitemap.xsl' });

  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');

  const writeStream = createWriteStream(filePath);

  sitemapStream.pipe(writeStream);

  // 将 URL 写入 sitemap
  urls.forEach((url) => {
    console.log(url);
    sitemapStream.write(url);
  });

  // 结束流
  sitemapStream.end();

  // 等待流完成
  await streamToPromise(sitemapStream);

  console.log('Sitemap 生成成功:', filePath);
}

generateSitemap(hostname).catch((err) => console.error(err));
