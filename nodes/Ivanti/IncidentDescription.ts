import { INodeProperties } from 'n8n-workflow';

export const incidentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['incident'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an incident',
				action: 'Create an incident',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'POST',
						url: '/incidents',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an incident',
				action: 'Delete an incident',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an incident',
				action: 'Get an incident',
				routing: {
					request: {
						method: 'GET',
						url: '/incidents',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Count',
				value: 'getCount',
				description: 'Retrieve a count of incidents',
				action: 'Retrieve a count of incidents',
				routing: {
					request: {
						method: 'GET',
						url: '/incidents',
					},
					send: {
						type: 'query',
						property: '$top',
						value: '1',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									count:
										'={{$responseItem["@odata.count"] == 0 ? 1 : $responseItem["@odata.count"] }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many incidents',
				action: 'Get many incidents',
				routing: {
					request: {
						method: 'GET',
						url: '/incidents',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Link',
				value: 'link',
				description: 'Link an incident',
				action: 'Link an incident',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an incident',
				action: 'Update an incident',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
		],
		default: 'getAll',
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'idType',
		type: 'options',
		options: [
			{
				name: 'Number',
				value: 'incidentNumber',
			},
			{
				name: 'Record ID',
				value: 'recId',
			},
		],
		default: 'recId',
		required: true,
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['incident'],
			},
		},
		description: 'Choose ID type from the list',
	},
	{
		displayName: 'Number',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['incident'],
				idType: ['incidentNumber'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: '=IncidentNumber eq {{ $value }}',
			},
		},
		description: 'IncidentNumber value of the incident in Ivanti',
	},
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['incident'],
				idType: ['recId'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=RecId eq '{{ $value }}'",
			},
		},
		description: 'RecId value of the incident in Ivanti',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'IncidentNumber, RecId, Status, Owner',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getCountOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getCount'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Resolved'",
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$top',
				value: '={{ $value }}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Send Sort Parameters',
		name: 'sortOptions',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether the request has sorting parameters or not',
	},
	{
		displayName: 'Sort',
		name: 'sortUi',
		type: 'fixedCollection',
		placeholder: 'Add Sort Options',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getAll'],
				sortOptions: [true],
			},
		},
		typeOptions: {
			multipleValues: false,
		},
		default: {
			// -----------------------------
			// There is a bug (or a feature). You can't add defaults if multipleValues is set to false
			// -----------------------------
			// sortDetails: [
			// 	{
			// 		sortBy: 'CreatedDateTime',
			// 		orderBy: 'asc',
			// 	},
			// ],
		},
		options: [
			{
				displayName: 'Sort Options',
				name: 'sortDetails',
				values: [
					{
						displayName: 'Sort Key Name or ID',
						name: 'sortBy',
						type: 'options',
						options: [
							{
								name: 'Creation Time',
								value: 'CreatedDateTime',
							},
							{
								name: 'Last Modification Time',
								value: 'LastModDateTime',
							},
						],
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						default: 'CreatedDateTime',
					},
					{
						displayName: 'Sort Order',
						name: 'orderBy',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'desc',
						routing: {
							send: {
								type: 'query',
								property: '$orderby',
								value: '={{ $parent.sortBy }} {{ $value }}',
							},
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Resolved'",
			},
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'IncidentNumber, RecId, Status, Owner',
			},
			{
				displayName: 'Skip Records',
				name: 'skip',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
					maxValue: 100,
				},
				routing: {
					send: {
						type: 'query',
						property: '$skip',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Use this property when looping trough more than 100 results',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const deleteOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['incident'],
			},
		},
		routing: {
			request: {
				url: "=/incidents('{{ $value }}')",
			},
			output: {
				postReceive: [
					{
						type: 'setKeyValue',
						properties: {
							Result: 'Success',
						},
					},
				],
			},
		},
		description: 'RecId value of the incident in Ivanti',
	},
];

const createOperation: INodeProperties[] = [
	{
		displayName: 'Subject',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['incident'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Subject',
			},
		},
		description: 'Short title of the incident',
	},
	{
		displayName: 'Symptom',
		name: 'info',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['incident'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Symptom',
			},
		},
		description: 'More information about the incident',
	},
	{
		displayName: 'Service (Name)',
		name: 'service',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['incident'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Service',
				value: '={{ $value || undefined }}',
			},
		},
		description: 'Which Service is related to incident',
	},
	{
		displayName: 'Customer User (ID)',
		name: 'userId',
		type: 'string',
		placeholder: '0014960452EE44259E8149C715B24DEF',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['incident'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'ProfileLink_RecID',
				value: '={{ $value || undefined }}',
			},
		},
		description: 'Which customer user (employee) is related to incident',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'First Call Resolution',
				name: 'firstResolution',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'FirstCallResolution',
					},
				},
				description: 'Whether incident is resolved by first call',
			},
			{
				displayName: 'Impact',
				name: 'impact',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
				routing: {
					send: {
						type: 'body',
						property: 'Impact',
					},
				},
				description:
					'Impact of the incident. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Master Incident',
				name: 'master',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsMasterIncident',
					},
				},
				description: 'Whether incident is master incident',
			},
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should resolve the incident',
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'Private',
					},
				},
				description: 'Whether incident is private',
			},
			{
				displayName: 'Service (ID)',
				name: 'serviceId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to the incident',
			},
			{
				displayName: 'Service Level Agreement (ID)',
				name: 'slaId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'XSC_ServiceLevelAgreement_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service Level Agreement is related to the incident',
			},
			{
				displayName: 'Service Level Agreement (Name)',
				name: 'sla',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'XSC_ServiceLevelAgreement',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service Level Agreement is related to the incident',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				options: [
					{
						name: 'AutoTicket',
						value: 'AutoTicket',
					},
					{
						name: 'Chat',
						value: 'Chat',
					},
					{
						name: 'Email',
						value: 'Email',
					},
					{
						name: 'Phone',
						value: 'Phone',
					},
					{
						name: 'Self Service',
						value: 'Self Service',
					},
				],
				default: 'AutoTicket',
				routing: {
					send: {
						type: 'body',
						property: 'Source',
					},
				},
				description:
					'From what source did the information about the incident come. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether incident was read',
			},
			{
				displayName: 'Urgency',
				name: 'urgency',
				type: 'options',
				options: [
					{
						name: 'Urgent',
						value: 'Urgent',
					},
					{
						name: 'Not Urgent',
						value: 'Not urgent',
					},
				],
				default: 'Urgent',
				routing: {
					send: {
						type: 'body',
						property: 'Urgency',
					},
				},
				description:
					'Urgency of the incident. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{$parent.name}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const updateOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['incident'],
			},
		},
		routing: {
			request: {
				url: "=/incidents('{{ $value }}')",
			},
		},
		description: 'RecId value of the incident in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['update'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Customer User (ID)',
				name: 'userId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'ProfileLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which customer user (employee) is related to incident',
			},
			{
				displayName: 'First Call Resolution',
				name: 'firstResolution',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'FirstCallResolution',
					},
				},
				description: 'Whether incident is resolved by first call',
			},
			{
				displayName: 'Impact',
				name: 'impact',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
				routing: {
					send: {
						type: 'body',
						property: 'Impact',
					},
				},
				description:
					'Impact of the incident. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Master Incident',
				name: 'master',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsMasterIncident',
					},
				},
				description: 'Whether incident is master incident',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Owner',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which person should resolve the incident',
			},
			{
				displayName: 'Owner Team',
				name: 'ownerTeam',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OwnerTeam',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which team should resolve the incident',
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'Private',
					},
				},
				description: 'Whether incident is private',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Resolution',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Resolution details of the incident',
			},
			{
				displayName: 'Service (ID)',
				name: 'serviceId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to the incident',
			},
			{
				displayName: 'Service (Name)',
				name: 'service',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Service',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service is related to incident',
			},
			{
				displayName: 'Service Level Agreement (ID)',
				name: 'slaId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'XSC_ServiceLevelAgreement_Valid',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service Level Agreement is related to the incident',
			},
			{
				displayName: 'Service Level Agreement (Name)',
				name: 'sla',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'XSC_ServiceLevelAgreement',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which Service Level Agreement is related to the incident',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				options: [
					{
						name: 'AutoTicket',
						value: 'AutoTicket',
					},
					{
						name: 'Chat',
						value: 'Chat',
					},
					{
						name: 'Email',
						value: 'Email',
					},
					{
						name: 'Phone',
						value: 'Phone',
					},
					{
						name: 'Self Service',
						value: 'Self Service',
					},
				],
				default: 'AutoTicket',
				routing: {
					send: {
						type: 'body',
						property: 'Source',
					},
				},
				description:
					'From what source did the information about the incident come. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Status',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Status of the incident',
			},
			{
				displayName: 'Subject',
				name: 'title',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Subject',
					},
				},
				description: 'Short title of the incident',
			},
			{
				displayName: 'Symptom',
				name: 'info',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Symptom',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'More information about the incident',
			},
			{
				displayName: 'Unread',
				name: 'isUnRead',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsUnRead',
					},
				},
				description: 'Whether incident was read',
			},
			{
				displayName: 'Urgency',
				name: 'urgency',
				type: 'options',
				options: [
					{
						name: 'Urgent',
						value: 'Urgent',
					},
					{
						name: 'Not Urgent',
						value: 'Not urgent',
					},
				],
				default: 'Urgent',
				routing: {
					send: {
						type: 'body',
						property: 'Urgency',
					},
				},
				description:
					'Urgency of the incident. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['update'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
		placeholder: 'Add Custom Field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'property',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{ $parent.name !== " " ? $parent.name : undefined}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const linkOperation: INodeProperties[] = [
	{
		displayName: "Record ID (Incident)",
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['incident'],
			},
		},
		description: 'RecId value of the incident in Ivanti',
	},
	{
		displayName: 'Relationship Name',
		name: 'relName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['incident'],
			},
		},
		description: 'Relationship name which will be used to link business objects',
	},
	{
		displayName: 'Record ID (Related Object)',
		name: 'rid',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['incident'],
			},
		},
		routing: {
			request: {
				url: "=/incidents('{{ $parameter['id'] }}')/{{ $parameter['relName'] }}('{{ $value }}')/$Ref",
			},
		},
		description: 'RecId value of the related business object in Ivanti',
	},
];

export const incidentFields: INodeProperties[] = [
	...createOperation,
	...deleteOperation,
	...getAllOperation,
	...getOperation,
	...getCountOperation,
	...updateOperation,
	...linkOperation,
];
