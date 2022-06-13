import { g, _, __ } from '../query'

const testGraph = {
    vertices: [
        { label: 'person', id: '1234-abcd-xyz0', props: { name: 'marko', age: 29 } },
        { label: 'person', id: '1234-abcd-xyz1', props: { name: 'vadas', age: 27 } },
        { label: 'person', id: '1234-abcd-xyz2', props: { name: 'peter', age: 35 } },
        { label: 'person', id: '1234-abcd-xyz3', props: { name: 'josh', age: 32 } },
        { label: 'software', id: '1234-abcd-xyz4', props: { name: 'ripple', lang: 'java' } },
        { label: 'software', id: '1234-abcd-xyz5', props: { name: 'lop', lang: 'java' } }
    ],
    edges: [
        { label: 'created', id: '5678-abcd-xyz0', inV: '1234-abcd-xyz0', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz1', inV: '1234-abcd-xyz2', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz2', inV: '1234-abcd-xyz3', outV: '1234-abcd-xyz5' },
        { label: 'created', id: '5678-abcd-xyz3', inV: '1234-abcd-xyz3', outV: '1234-abcd-xyz4' }
    ]
}

test('addE to', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').addE('knows').to('1234-abcd-xyz1')

    const r = q.executeRawOut(graph)

    expect(r.graph.edges.length).toBe(5)
    expect(r.traversers[0].current.label).toBe('knows')
    expect(r.traversers[0].current.inV).toBe('1234-abcd-xyz1')
    expect(r.traversers[0].current.outV).toBe('1234-abcd-xyz0')
})

test('addE to subquery', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().V('1234-abcd-xyz0').addE('supports').to(g().V().hasLabel('software'))

    const r = q.executeRawOut(graph)

    expect(r.graph.edges.length).toBe(6)
})

test('addE to subquery + from subquery', () => {
    const graph = { vertices: [...testGraph.vertices], edges: [...testGraph.edges] }

    const q = g().addE('supports').from(g().V('1234-abcd-xyz0')).to(g().V().hasLabel('software'))

    const r = q.executeRawOut(graph)

    expect(r.graph.edges.length).toBe(6)
})

test('multi edges', () => {
  
  const q = g().V('start')
    .sideEffect(_().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'test123')
        .has('versionType', 'quote').has('versionSequence', 2).has('isCurrent', true)
        .addE('renewsFrom').property('__edgeTransactionId', '6898dfc6-6b1f-4f60-831d-019c99261b33').property('__timeStamp', 1654896040770)
        .to(_().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'to-be-provided-by-test')
        .has('versionType', 'to-be-provided-by-test').has('versionSequence', 4).has('isCurrent', true)))
    .sideEffect(_().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'test123').has('versionType', 'quote')
      .has('versionSequence', 2).has('isCurrent', true)
      .addE('hasStatus').property('__edgeTransactionId', '6898dfc6-6b1f-4f60-831d-019c99261b33').property('__timeStamp', 1654896040770)
      .to(__().V().has('id', '2cebd0ed-2d71-441e-8b0b-ca3d03926790')))
    .sideEffect(_().V().hasLabel('insuranceContract').has('policyReferenceNumber', 'test123')
      .has('versionType', 'quote').has('versionSequence', 2).has('isCurrent', true)
      .addE('hasContractParty').property('__edgeTransactionId', '6898dfc6-6b1f-4f60-831d-019c99261b33').property('__timeStamp', 1654896040770)
      .to(__().V().has('id', '0312797e-5bb1-4cd6-a3e0-0354327a7aef')))
      .sideEffect(_().V().has('id', '0312797e-5bb1-4cd6-a3e0-0354327a7aef')
        .addE('belongsToParty').property('__edgeTransactionId', '6898dfc6-6b1f-4f60-831d-019c99261b33').property('__timeStamp', 1654896040770)
        .to(__().V().hasLabel('organisation').has('partyExternalReference', 'AHLI0007')))

  const r = q.executeRawOut(testGraph2)

  expect(r.graph.edges.length).toBe(9)

})



const testGraph2 = {
  edges: [
    {
      label: "hasEntityItem",
      id: "e233072f-7307-4f9b-99c9-025d7105c782",
      inV: "fef02beb-0326-4db4-90de-ff87730b8dc1",
      outV: "e755dfef-6481-4079-baba-092741c7ce08",
      inVLabel: "insuranceContract",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        transactionTimeStamp: 1654896040770,
        date: "2022-06-10T21:20:40.770Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "90bb6500-ef3b-4205-b711-b00127902813",
      inV: "2cebd0ed-2d71-441e-8b0b-ca3d03926790",
      outV: "e755dfef-6481-4079-baba-092741c7ce08",
      inVLabel: "insuranceContractStatus",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        transactionTimeStamp: 1654896040770,
        date: "2022-06-10T21:20:40.770Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "f10f44fa-442f-448f-9506-44ec66eab47c",
      inV: "0312797e-5bb1-4cd6-a3e0-0354327a7aef",
      outV: "e755dfef-6481-4079-baba-092741c7ce08",
      inVLabel: "contractInsured",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        transactionTimeStamp: 1654896040770,
        date: "2022-06-10T21:20:40.770Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "941ae2cb-60fd-44df-afa0-cdf9683b3c9c",
      inV: "ea930ddf-7844-4281-8f00-d51ccb741ce6",
      outV: "d15a2033-a2da-40aa-9383-1df0b3c09531",
      inVLabel: "insuranceContract",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        transactionTimeStamp: 1654896040770,
        date: "2022-06-10T21:20:40.770Z",
        useType: undefined,
      },
    },
    {
      label: "hasEntityItem",
      id: "5f47d511-eb3b-4a70-aca9-72e755ee553b",
      inV: "8aa6cf90-4be1-4867-a62f-dc3cc66ebf18",
      outV: "8a6428ec-047c-4cee-a6be-1cca24c70e76",
      inVLabel: "organisation",
      outVLabel: "EntityRoot",
      props: {
        edgeTransactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        transactionTimeStamp: 1654896040770,
        date: "2022-06-10T21:20:40.770Z",
        useType: undefined,
      },
    }
  ],
  vertices: [
    {
      label: "start",
      id: "start",
    },
    {
      label: "Transaction",
      id: "6898dfc6-6b1f-4f60-831d-019c99261b33",
      props: {
        __entityId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        createdDate: "2022-06-10T21:20:55.857Z",
        timeStamp: 1654896055857,
        committed: false,
        rolledback: false,
      },
    },
    {
      label: "EntityRoot",
      id: "e755dfef-6481-4079-baba-092741c7ce08",
      props: {
        entityType: "insuranceContract",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __entityId: "e755dfef-6481-4079-baba-092741c7ce08",
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
      id: "fef02beb-0326-4db4-90de-ff87730b8dc1",
      props: {
        __schemaMetadata: {
          name: "insuranceContractMultiPartKey",
          version: "1.1.0",
          createdOn: "2022-06-10T21:20:40.770Z",
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
        __entityId: "e755dfef-6481-4079-baba-092741c7ce08",
        __viewType: "insuranceContractMultiPartKey",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __timeStamp: 1654896040770,
      },
    },
    {
      label: "insuranceContractStatus",
      id: "2cebd0ed-2d71-441e-8b0b-ca3d03926790",
      props: {
        __schemaMetadata: {
          name: "insuranceContractStatus",
          version: "1.1.0",
          createdOn: "2022-06-10T21:20:40.770Z",
          createdBy: "testuser",
        },
        sanctionsCheckStatus: "S1",
        licensingCheckStatus: "L1",
        __isEntity: false,
        __entityId: "e755dfef-6481-4079-baba-092741c7ce08",
        __viewType: "insuranceContractStatus",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __timeStamp: 1654896040770,
      },
    },
    {
      label: "contractInsured",
      id: "0312797e-5bb1-4cd6-a3e0-0354327a7aef",
      props: {
        __schemaMetadata: {
          name: "contractInsured",
          version: "1.1.0",
          createdOn: "2022-06-10T21:20:40.770Z",
          createdBy: "testuser",
        },
        legalDomicile: "United Kingdom of Great Britain and Northern Ireland",
        occupationCode: "537",
        partyRoleTypeName: "Insured",
        __isEntity: false,
        __entityId: "e755dfef-6481-4079-baba-092741c7ce08",
        __viewType: "contractInsured",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __timeStamp: 1654896040770,
      },
    },
    {
      label: "EntityRoot",
      id: "d15a2033-a2da-40aa-9383-1df0b3c09531",
      props: {
        entityType: "insuranceContract",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __entityId: "d15a2033-a2da-40aa-9383-1df0b3c09531",
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
      id: "ea930ddf-7844-4281-8f00-d51ccb741ce6",
      props: {
        __schemaMetadata: {
          name: "insuranceContractMultiPartKey",
          version: "1.1.0",
          createdOn: "2022-06-10T21:20:40.770Z",
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
        __entityId: "d15a2033-a2da-40aa-9383-1df0b3c09531",
        __viewType: "insuranceContractMultiPartKey",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __timeStamp: 1654896040770,
      },
    },
    {
      label: "EntityRoot",
      id: "8a6428ec-047c-4cee-a6be-1cca24c70e76",
      props: {
        entityType: "organisation",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __entityId: "8a6428ec-047c-4cee-a6be-1cca24c70e76",
        entityKeyProperty: "partyExternalReference",
        entityKeyValue: "AHLI0007",
        __testRef: undefined,
      },
    },
    {
      label: "organisation",
      id: "8aa6cf90-4be1-4867-a62f-dc3cc66ebf18",
      props: {
        __schemaMetadata: {
          name: "organisation",
          version: "1.1.0",
          createdOn: "2022-06-10T21:20:40.770Z",
          createdBy: "testuser",
        },
        partyExternalReference: "AHLI0007",
        dataSourceDescription: "PartyApi-Insured",
        fullName: "AHL Industrial Pipework Specialists Ltd & HoggEngineering Ltd",
        __isEntity: true,
        __entityId: "8a6428ec-047c-4cee-a6be-1cca24c70e76",
        __viewType: "organisation",
        __transactionId: "6898dfc6-6b1f-4f60-831d-019c99261b33",
        __transType: "V1",
        __timeStamp: 1654896040770,
      },
    },
  ],
}


