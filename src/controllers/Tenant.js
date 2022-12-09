import knexx from '../db/index.js';

const { v4: uuidv4 } = require('uuid')
const generator = require('generate-password')
const slugify = require('slugify')
const { up, down } = require('../services/tenant-service')
const store = async (req, res) => {
  const {
    body: { organization }
  } = req

  const tenantName = slugify(organization.toLowerCase(), '_')
  const password = generator.generate({ length: 12, numbers: true })
  const uuid = uuidv4()
  const tenant = {
    uuid,
    db_name: tenantName,
    db_username: tenantName,
    db_password: password
  };
  await knexx('public.tenants').insert(tenant).returning("tenant_id");

  await up({ tenantName, password, uuid })
  return res.status(200).json(Object.assign({ success: true }, tenant));
  // return res.formatter.ok({ tenant: { 'gg':"gdg" } }) 
  // return res.formatter.ok({ tenant: { ...tenant } }) 
}

const destroy = async (req, res) => {
  const {
    query: { uuid }
  } = req
  console.log(uuid)
  const tenant = await knexx
    .select('db_name', 'db_username', 'uuid')
    .where('uuid', uuid)
    .from('tenants')

  await down({
    userName: tenant[0].db_username,
    tenantName: tenant[0].db_name,
    uuid: tenant[0].uuid
  })
  await db('tenants').where('uuid', uuid).del()

  return res.status(200).json(Object.assign({ success: true }, 'Database deleted sucessfully.'));
}

module.exports = {
  // index, 
  store,
  destroy
} 