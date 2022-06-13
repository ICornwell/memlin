import { g, _, __ } from '../query'
import { newGraph } from '../query'

const testGraph = {
    vertices: [
        { label: 'person', id: '1234-abcd-xyz0', props: { name: 'marko', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz1', props: { name: 'vadas', age: 27 } },
        { label: 'person', id: '1234-abcd-xyz2', props: { name: 'peter', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz3', props: { name: 'josh', age: 32 } },
        { label: 'software', id: '1234-abcd-xyz4', props: { name: 'ripple', lang: 'java' } },
        { label: 'software', id: '1234-abcd-xyz5', props: { name: 'lop', lang: 'java' } }
    ],
    edges: [
        { label: 'created', id: '5678-abcd-xyz0', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', outV: '1234-abcd-xyz3', inV: '1234-abcd-xyz4' },
        { label: 'knows', id: '5678-abcd-xyz4', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz1' },
        { label: 'knows', id: '5678-abcd-xyz5', outV: '1234-abcd-xyz0', inV: '1234-abcd-xyz3' },
        { label: 'knows', id: '5678-abcd-xyz6', outV: '1234-abcd-xyz2', inV: '1234-abcd-xyz0' }
    ]
}

test('one V union to find 3', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').union(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(3)
    expect(r.traversers[0].current.props.name).toBe('lop')
    expect(r.traversers[1].current.props.name).toBe('vadas')
    expect(r.traversers[2].current.props.name).toBe('josh')
})

test('two Vs union to find 5', () => {

    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V().has('age', 29).union(
            g().outE('created').inV(),
            g().outE('knows').inV() )


    const r = q.executeRawOut(graph)


    expect(r.traversers.length).toBe(5)
    expect(r.traversers[0].current.props.name).toBe('lop')
    expect(r.traversers[1].current.props.name).toBe('vadas')
    expect(r.traversers[2].current.props.name).toBe('josh')
    expect(r.traversers[3].current.props.name).toBe('lop')
    expect(r.traversers[4].current.props.name).toBe('marko')
})

test('combined query', ()=> {
  const graph = { vertices: [...testGraph2.vertices], edges: [...testGraph2.edges] }

  const q = g().V('start')
  .union(_().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'test123')
              .has('versionType', 'quote').has('versionSequence', 2)
              .has('isCurrent', true).not(__().has('__entityId', '1bc40e29-2b97-4e9d-9fed-1c6de718ef2f')).limit(1),
              _().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'test123')
              .has('versionType', 'quote').has('versionSequence', 1)
              .has('isCurrent', true).not(__().has('__entityId', '1bc40e29-2b97-4e9d-9fed-1c6de718ef2f')).limit(1)
              )

// .not(__().V().has('__entityId', '1bc40e29-2b97-4e9d-9fed-1c6de718ef2f')

  const r = q.executeRawOut(graph)
  expect(r.traversers.length).toBe(1)
})

const testGraph2 = {
  edges: [
    {
      label: "hasEntityItem",
      id: "6b7d6d48-6aee-4cd4-ab24-7bc737ee946c",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "32a2a282-a0f0-4b42-a217-8432642c4c98",
      inVLabel: "insuranceContract",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        transactionTimeStamp: 1654887083266,
        date: "2022-06-10T18:51:23.266Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "caeee493-0ec3-4c7e-b676-c54fb97e55c1",
      inV: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      outV: "32a2a282-a0f0-4b42-a217-8432642c4c98",
      inVLabel: "insuranceContractStatus",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        transactionTimeStamp: 1654887083266,
        date: "2022-06-10T18:51:23.266Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "210bd0d9-cc64-40ed-a627-3386eda3f150",
      inV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      outV: "32a2a282-a0f0-4b42-a217-8432642c4c98",
      inVLabel: "contractInsured",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        transactionTimeStamp: 1654887083266,
        date: "2022-06-10T18:51:23.266Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "5eff3153-70de-49df-9e29-2ecf8168373d",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "71bae863-8ee3-4198-b8c7-b60ded741d2c",
      inVLabel: "insuranceContract",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        transactionTimeStamp: 1654887083266,
        date: "2022-06-10T18:51:23.266Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "c802223f-76d0-4dd3-b96b-e28a0f498685",
      inV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      outV: "2c8aa715-239b-45dc-9e95-d152ec39c6f4",
      inVLabel: "organisation",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        transactionTimeStamp: 1654887083266,
        date: "2022-06-10T18:51:23.266Z",
        useType: undefined,
      },
    },
    {
      label: "renewsTo",
      id: "74e099d8-89c6-4c47-b1f0-90455672cf6b",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "renewsTo",
      id: "d895ef7c-ed4b-45bf-9ea3-30cd94831c86",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "renewsFrom",
      id: "77af39e8-3626-466b-8e16-35534e1f8cf4",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "renewsFrom",
      id: "eebccac6-07da-4991-8936-ec2c9b86b28d",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "hasInsuranceContract",
      id: "30c596e7-4e20-49af-8dc1-1a8d59091a23",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContractStatus",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "hasInsuranceContract",
      id: "095308c4-d68f-449d-85d8-e43adf157946",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContractStatus",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "hasStatus",
      id: "9bc7d95a-bff0-41e9-ae54-100573acc8b2",
      inV: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      outV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      inVLabel: "insuranceContractStatus",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "belongsToInsuranceContract",
      id: "8d11c0f1-e280-41c8-bc4d-f96deb65a927",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      inVLabel: "insuranceContract",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "belongsToInsuranceContract",
      id: "09898c63-2cce-47e0-af7d-811995fd5352",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      inVLabel: "insuranceContract",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "hasContractParty",
      id: "767cbd8a-afc1-491e-8ce3-890854ecad57",
      inV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      outV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      inVLabel: "contractInsured",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "hasPartyRole",
      id: "7313d436-bee1-4f8d-b05d-171bd28b14da",
      inV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      outV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      inVLabel: "contractInsured",
      outVLabel: "organisation",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "belongsToParty",
      id: "a66fc38c-a6ad-4d7d-8cf0-9a84e38df6cf",
      inV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      outV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      inVLabel: "organisation",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "transLinkV1",
      id: "d1f84cd5-d74e-4a3b-919c-0edb452c2bca",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      inVLabel: "Transaction",
      outVLabel: "Transaction",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "511ec22b-d3c4-4bab-902a-caef5b334061",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "32a2a282-a0f0-4b42-a217-8432642c4c98",
      inVLabel: "Transaction",
      outVLabel: "EntityRoot",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "1753e249-c9ac-48ab-be59-b714e60f19c7",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      inVLabel: "Transaction",
      outVLabel: "insuranceContract",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "8f558193-95fb-4af0-a150-e4e8f3c50d1c",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      inVLabel: "Transaction",
      outVLabel: "insuranceContractStatus",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "e4ba3f1b-f212-400f-aaf9-42b512a06101",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      inVLabel: "Transaction",
      outVLabel: "contractInsured",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "97c67039-7d33-4e45-bc44-3c821dd4ad2c",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "71bae863-8ee3-4198-b8c7-b60ded741d2c",
      inVLabel: "Transaction",
      outVLabel: "EntityRoot",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "a8687660-1905-4274-a2eb-6ee816cf4580",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "Transaction",
      outVLabel: "insuranceContract",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "14158ded-c5a2-46c0-bd1d-98ec5a172740",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "2c8aa715-239b-45dc-9e95-d152ec39c6f4",
      inVLabel: "Transaction",
      outVLabel: "EntityRoot",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "00ac1816-ea87-4433-9559-88461a45b7db",
      inV: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      outV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      inVLabel: "Transaction",
      outVLabel: "organisation",
      props: undefined,
    },
    {
      label: "hasEntityItem",
      id: "4b2db97c-de5d-442c-b2e8-96a74e9309aa",
      inV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      outV: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
      inVLabel: "insuranceContract",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        transactionTimeStamp: 1654887095993,
        date: "2022-06-10T18:51:35.993Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "c73295f4-9781-46a7-b85d-56d602d1784b",
      inV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      outV: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
      inVLabel: "insuranceContractStatus",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        transactionTimeStamp: 1654887095993,
        date: "2022-06-10T18:51:35.993Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "d571b105-5053-4f4a-8491-81804ceb4cc4",
      inV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      outV: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
      inVLabel: "contractInsured",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        transactionTimeStamp: 1654887095993,
        date: "2022-06-10T18:51:35.993Z",
        useType: undefined,
      },
    },
    {
      label: "renewsTo",
      id: "c9dfbf51-efaf-4649-9aa3-9db703cdeed0",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "renewsTo",
      id: "fa30fcfb-842e-4dcd-a3b6-3e61de197ace",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "renewsTo",
      id: "5f652180-a6e0-4380-9f11-708d4bbb8e9e",
      inV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      outV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "renewsFrom",
      id: "affd3bb4-d1de-4ae9-a77b-265110591659",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "renewsFrom",
      id: "55aaa44b-2266-4307-8da6-6540e5bae083",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "renewsFrom",
      id: "4fad35e0-efa0-49a8-a3f1-88f745c3a5bd",
      inV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasInsuranceContract",
      id: "3df7c7d0-5cd7-4aab-9beb-dd88c78d9a6c",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContractStatus",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasInsuranceContract",
      id: "3212545a-7e9b-487b-8a99-b7ad3cb7f482",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContractStatus",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasInsuranceContract",
      id: "a0bfed57-d40d-4a27-95ca-8b89c7140a34",
      inV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      outV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      inVLabel: "insuranceContract",
      outVLabel: "insuranceContractStatus",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasStatus",
      id: "05e0e8bc-2177-403e-a15f-ac018d7f002c",
      inV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "insuranceContractStatus",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "belongsToInsuranceContract",
      id: "a2709248-a73c-4892-9ef8-d11538cd2449",
      inV: "646e9ece-44d5-41ab-9091-71383e0339c8",
      outV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      inVLabel: "insuranceContract",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "belongsToInsuranceContract",
      id: "6a581100-501a-4e52-a8a8-eff297761f10",
      inV: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      outV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      inVLabel: "insuranceContract",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "belongsToInsuranceContract",
      id: "266a91e0-6b11-4574-b646-35dee41a3806",
      inV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      outV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      inVLabel: "insuranceContract",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasContractParty",
      id: "5bad12ee-8736-4e38-a039-960f53546c75",
      inV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "contractInsured",
      outVLabel: "insuranceContract",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "hasPartyRole",
      id: "02f88c48-938d-4ddc-a3fa-750d0ca0fe6d",
      inV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      outV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      inVLabel: "contractInsured",
      outVLabel: "organisation",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "belongsToParty",
      id: "2049c7f6-1ac1-4760-88aa-42ace49d8052",
      inV: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      outV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      inVLabel: "organisation",
      outVLabel: "contractInsured",
      props: {
        __edgeTransactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "transLinkV1",
      id: "eeffc538-6a8e-4dbc-ab81-e6840a83b404",
      inV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      outV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      inVLabel: "Transaction",
      outVLabel: "Transaction",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "877a0ae0-97aa-4d13-aef0-f3766d570ffa",
      inV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      outV: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
      inVLabel: "Transaction",
      outVLabel: "EntityRoot",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "7e7012c1-b6f8-4e43-87e6-5a306912f372",
      inV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      outV: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      inVLabel: "Transaction",
      outVLabel: "insuranceContract",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "b9bed467-61b5-4b41-8ae2-b8c1f0e9f497",
      inV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      outV: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      inVLabel: "Transaction",
      outVLabel: "insuranceContractStatus",
      props: undefined,
    },
    {
      label: "transLinkV1",
      id: "af8d5ca0-aa08-4291-a12e-368504cdc40c",
      inV: "62132b5b-220b-41bd-a11b-c9e74693c326",
      outV: "8944b77c-5353-454f-80ae-8d563bb4231e",
      inVLabel: "Transaction",
      outVLabel: "contractInsured",
      props: undefined,
    },
  ],
  vertices: [
    {
      label: "start",
      id: "start",
    },
    {
      label: "Transaction",
      id: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
      props: {
        __entityId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        createdDate: "2022-06-10T18:51:35.724Z",
        timeStamp: 1654887095724,
        committed: true,
        rolledback: false,
      },
    },
    {
      label: "EntityRoot",
      id: "32a2a282-a0f0-4b42-a217-8432642c4c98",
      props: {
        entityType: "insuranceContract",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __entityId: "32a2a282-a0f0-4b42-a217-8432642c4c98",
        entityKeyProperty: "policyReferenceNumber|versionType|versionSequence|isCurrent",
        entityKeyValue: [
          "test123",
          "quote",
          2,
          true,
        ],
        __testRef: undefined,
      },
    },
    {
      label: "insuranceContract",
      id: "646e9ece-44d5-41ab-9091-71383e0339c8",
      props: {
        __schemaMetadata: {
          name: "insuranceContractMultiPartKey",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:23.266Z",
          createdBy: "testuser",
        },
        policyReferenceNumber: "test123",
        versionType: "quote",
        versionSequence: 2,
        isCurrent: true,
        methodOfAcceptance: "Open Market",
        policyFormCode: "CVU",
        inceptionDate: "2022-09-03T00:00:00.000Z",
        expiryDate: "2023-11-16T00:00:00.000Z",
        effectivePeriodStartDate: "2022-09-03T00:00:00.000Z",
        effectivePeriodEndDate: "2023-11-16T00:00:00.000Z",
        isLongTermAgreement: false,
        masterSequence: "002",
        __isEntity: true,
        __entityId: "32a2a282-a0f0-4b42-a217-8432642c4c98",
        __viewType: "insuranceContractMultiPartKey",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "insuranceContractStatus",
      id: "7ad1296d-3b55-4cbd-9bcd-646e55b1433a",
      props: {
        __schemaMetadata: {
          name: "insuranceContractStatus",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:23.266Z",
          createdBy: "testuser",
        },
        sanctionsCheckStatus: "S1",
        licensingCheckStatus: "L1",
        __isEntity: false,
        __entityId: "32a2a282-a0f0-4b42-a217-8432642c4c98",
        __viewType: "insuranceContractStatus",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "contractInsured",
      id: "977db0c9-05c5-4c03-a892-7a43d45a2ff3",
      props: {
        __schemaMetadata: {
          name: "contractInsured",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:23.266Z",
          createdBy: "testuser",
        },
        legalDomicile: "United Kingdom of Great Britain and Northern Ireland",
        occupationCode: "537",
        partyRoleTypeName: "Insured",
        __isEntity: false,
        __entityId: "32a2a282-a0f0-4b42-a217-8432642c4c98",
        __viewType: "contractInsured",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "EntityRoot",
      id: "71bae863-8ee3-4198-b8c7-b60ded741d2c",
      props: {
        entityType: "insuranceContract",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __entityId: "71bae863-8ee3-4198-b8c7-b60ded741d2c",
        entityKeyProperty: "policyReferenceNumber|versionType|versionSequence|isCurrent",
        entityKeyValue: [
          "to-be-provided-by-test",
          "to-be-provided-by-test",
          4,
          true,
        ],
        __testRef: undefined,
      },
    },
    {
      label: "insuranceContract",
      id: "15e81335-4ed0-4dfb-9598-ed1cfa8c98bc",
      props: {
        __schemaMetadata: {
          name: "insuranceContractMultiPartKey",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:23.266Z",
          createdBy: "testuser",
        },
        policyReferenceNumber: "to-be-provided-by-test",
        versionType: "to-be-provided-by-test",
        versionSequence: 4,
        isCurrent: true,
        policyFormCode: "CVU",
        inceptionDate: "2021-06-20T00:00:00.000Z",
        expiryDate: "2022-09-02T00:00:00.000Z",
        __isEntity: true,
        __entityId: "71bae863-8ee3-4198-b8c7-b60ded741d2c",
        __viewType: "insuranceContractMultiPartKey",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "EntityRoot",
      id: "2c8aa715-239b-45dc-9e95-d152ec39c6f4",
      props: {
        entityType: "organisation",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __entityId: "2c8aa715-239b-45dc-9e95-d152ec39c6f4",
        entityKeyProperty: "partyExternalReference",
        entityKeyValue: "AHLI0007",
        __testRef: undefined,
      },
    },
    {
      label: "organisation",
      id: "a30b00c2-aafe-4b09-a6fd-8e428f6407cb",
      props: {
        __schemaMetadata: {
          name: "organisation",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:23.266Z",
          createdBy: "testuser",
        },
        partyExternalReference: "AHLI0007",
        dataSourceDescription: "PartyApi-Insured",
        fullName: "AHL Industrial Pipework Specialists Ltd & HoggEngineering Ltd",
        __isEntity: true,
        __entityId: "2c8aa715-239b-45dc-9e95-d152ec39c6f4",
        __viewType: "organisation",
        __transactionId: "a1ef2ac5-0944-4273-ae3e-75e2c6b250c9",
        __transType: "V1",
        __timeStamp: 1654887083266,
      },
    },
    {
      label: "Transaction",
      id: "62132b5b-220b-41bd-a11b-c9e74693c326",
      props: {
        __entityId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __transactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        createdDate: "2022-06-10T18:51:36.818Z",
        timeStamp: 1654887096818,
        committed: true,
        rolledback: false,
      },
    },
    {
      label: "EntityRoot",
      id: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
      props: {
        entityType: "insuranceContract",
        __transactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __transType: "V1",
        __entityId: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
        entityKeyProperty: "policyReferenceNumber|versionType|versionSequence|isCurrent",
        entityKeyValue: [
          "test123",
          "quote",
          1,
          true,
        ],
        __testRef: undefined,
      },
    },
    {
      label: "insuranceContract",
      id: "bfad99a4-7afd-4d09-a31b-a6e180a64517",
      props: {
        __schemaMetadata: {
          name: "insuranceContractMultiPartKey",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:35.993Z",
          createdBy: "testuser",
        },
        policyReferenceNumber: "test123",
        versionType: "quote",
        versionSequence: 1,
        isCurrent: true,
        methodOfAcceptance: "Open Market",
        policyFormCode: "CVU",
        inceptionDate: "2022-09-03T00:00:00.000Z",
        expiryDate: "2023-11-16T00:00:00.000Z",
        effectivePeriodStartDate: "2022-09-03T00:00:00.000Z",
        effectivePeriodEndDate: "2023-11-16T00:00:00.000Z",
        isLongTermAgreement: false,
        masterSequence: "002",
        __isEntity: true,
        __entityId: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
        __viewType: "insuranceContractMultiPartKey",
        __transactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __transType: "V1",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "insuranceContractStatus",
      id: "2eb4b4b4-20be-4ec9-988a-e20abb6d6ce4",
      props: {
        __schemaMetadata: {
          name: "insuranceContractStatus",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:35.993Z",
          createdBy: "testuser",
        },
        sanctionsCheckStatus: "S1",
        licensingCheckStatus: "L1",
        __isEntity: false,
        __entityId: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
        __viewType: "insuranceContractStatus",
        __transactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __transType: "V1",
        __timeStamp: 1654887095993,
      },
    },
    {
      label: "contractInsured",
      id: "8944b77c-5353-454f-80ae-8d563bb4231e",
      props: {
        __schemaMetadata: {
          name: "contractInsured",
          version: "1.1.0",
          createdOn: "2022-06-10T18:51:35.993Z",
          createdBy: "testuser",
        },
        legalDomicile: "United Kingdom of Great Britain and Northern Ireland",
        occupationCode: "537",
        partyRoleTypeName: "Insured",
        __isEntity: false,
        __entityId: "1bc40e29-2b97-4e9d-9fed-1c6de718ef2f",
        __viewType: "contractInsured",
        __transactionId: "62132b5b-220b-41bd-a11b-c9e74693c326",
        __transType: "V1",
        __timeStamp: 1654887095993,
      },
    },
  ],
}

