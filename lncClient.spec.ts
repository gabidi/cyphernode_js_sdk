import { serial as test } from "ava";
import lnClient from "./lncClient";
import uuid from "uuid/v4";
test.before(t => {
  t.context = {
    lightingInvoiceLabel: uuid(),
    ...lnClient({
      apiKey:
        "5b5d6ff9027dc1fdce9e84645329a194d79f346b3c7a5338d9610139c1fbd2e8",
      userType: 3
    })
  };
});
/**
LN tests
*/
test("Should be able to get the lightning nodes info", async t => {
  const {
    context: { getNodeInfo }
  } = t;
  const nodeInfo = await getNodeInfo();
  t.true(!!nodeInfo.id.length);
  t.false(isNaN(nodeInfo.blockheight));
  t.false(isNaN(nodeInfo.num_peers));
});
test("Should be able to a connection string", async t => {
  const {
    context: { getConnectionString }
  } = t;
  const connString = await getConnectionString();
  t.is(connString.length, 86);
});
test("Should be able to a new LN address", async t => {
  const {
    context: { getNewAddress }
  } = t;
  const addrs = await getNewAddress();
  t.is(addrs.length,42);
});
test("Should be able to create an invoice", async t => {
  const {
    context: { createInvoice, lightingInvoiceLabel }
  } = t;
  const makeInvoicePayload = {
    msatoshi: "10",
    label: lightingInvoiceLabel,
    description: "Ava Test Inovice",
    expiry: "900",
    callback_url: "http://192.168.122.159"
  };
  const body = await createInvoice(makeInvoicePayload);
  t.true(!!body);
  const invoice = body;
  t.true(invoice.id > 0);
  t.true(invoice.bolt11.indexOf("ln") === 0);
  t.true(!!invoice.payment_hash.length);
});

test("Should be able to decode a bolt", async t => {
  const {
    context: { decodeBolt }
  } = t;
  const bolt11 =
    "lnbc100p1pw0aw9qpp5cm9fu5nyn3vq0892p4ray75pqvetkz6w483u9lvwn7skex2q0m0sdqugfukcmrnyphhyer9wgszxvfsxc6qxqzuycqp2cv44hlzy2vfewyp4e4re0cywurtncpqu9jkvdxj8w8vds2q390pzq79a7d0kfvty7pt24rd8uqg3n0jxz702lkn9l2vxyqwh08ru27qpayvd5j";
  const decodedBolt = await decodeBolt(bolt11);
  t.true(!!decodedBolt.currency);
  t.false(isNaN(decodedBolt.created_at));
  t.false(decodedBolt.msatoshi === undefined);
  t.true(!!decodedBolt.payment_hash.length);
  t.true(!!decodedBolt.signature.length);
});
test("Should be able to get invoices and created invoice should be included", async t => {
  const {
    context: { getInvoice, lightingInvoiceLabel }
  } = t;
  const invoices = await getInvoice();
  t.true(invoices.some(({ label }) => label === lightingInvoiceLabel));
});
