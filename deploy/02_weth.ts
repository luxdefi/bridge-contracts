// 02_weth.ts

import { Deploy } from '@zoolabs/standard/utils/deploy'

export default Deploy('WETH', {}, async({ hre, deploy, deployments, deps }) => { await deploy() })
