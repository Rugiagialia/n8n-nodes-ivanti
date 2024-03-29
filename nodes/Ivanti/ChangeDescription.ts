import { INodeProperties } from 'n8n-workflow';

// new

export const changeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['change'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a change',
				action: 'Create a change',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'POST',
						url: '/changes',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a change',
				action: 'Delete a change',
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
				description: 'Retrieve a change',
				action: 'Get a change',
				routing: {
					request: {
						method: 'GET',
						url: '/changes',
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
				description: 'Retrieve a count of changes',
				action: 'Retrieve a count of changes',
				routing: {
					request: {
						method: 'GET',
						url: '/changes',
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
				description: 'Get many changes',
				action: 'Get many changes',
				routing: {
					request: {
						method: 'GET',
						url: '/changes',
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
				description: 'Link a change',
				action: 'Link a change',
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
				description: 'Update a change',
				action: 'Update a change',
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
				resource: ['change'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Subject',
			},
		},
		description: 'Short title of the change',
	},
	{
		displayName: 'Description',
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
				resource: ['change'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'Description',
			},
		},
		description: 'More information about the change',
	},
	{
		displayName: 'Type Of Change',
		name: 'changeType',
		type: 'options',
		options: [
			{
				name: 'Normal',
				value: 'Normal',
			},
			{
				name: 'Operational',
				value: 'Operational',
			},
			{
				name: 'Standard',
				value: 'Standard',
			},
		],
		default: 'Normal',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['change'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'TypeOfChange',
			},
		},
		description:
			'Type of the change. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
				resource: ['change'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'RequestorLink_RecID',
				value: '={{ $value || undefined }}',
			},
		},
		description: 'Which customer user (employee) is related to change',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['change'],
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
				resource: ['change'],
				operation: ['create'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
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
				description: 'Which team should implement the change',
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
				description: 'Whether change is private',
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
				description: 'Which Service is related to the change',
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
				description: 'Which Service is related to the change',
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
				description: 'Which Service Level Agreement is related to the change',
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
				description: 'Which Service Level Agreement is related to the change',
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
				description: 'Whether change was read',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['change'],
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
				resource: ['change'],
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
				resource: ['change'],
			},
		},
		routing: {
			request: {
				url: "=/changes('{{ $value }}')",
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
		description: 'RecId value of the change in Ivanti',
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
				value: 'changeNumber',
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
				resource: ['change'],
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
				resource: ['change'],
				idType: ['changeNumber'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: '=ChangeNumber eq {{ $value }}',
			},
		},
		description: 'ChangeNumber value of the change in Ivanti',
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
				resource: ['change'],
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
		description: 'RecId value of the change in Ivanti',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['change'],
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
				placeholder: 'ChangeNumber, RecId, Status, Owner',
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
				resource: ['change'],
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
				resource: ['change'],
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
				resource: ['change'],
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
				resource: ['change'],
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
				placeholder: "Status eq 'Closed'",
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
				placeholder: 'ChangeNumber, RecId, Status, Owner',
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

const getCountOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['change'],
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
				placeholder: "Status eq 'Closed'",
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
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
				resource: ['change'],
			},
		},
		routing: {
			request: {
				url: "=/changes('{{ $value }}')",
			},
		},
		description: 'RecId value of the change in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['change'],
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
				resource: ['change'],
				operation: ['update'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Description',
				name: 'info',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Description',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'More information about the change',
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
				description: 'Which person should implement the change',
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
				description: 'Which team should implement the change',
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
				description: 'Whether change is private',
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
				description: 'Resolution details of the change',
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
				description: 'Which Service is related to the change',
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
				description: 'Which Service is related to the change',
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
				description: 'Which Service Level Agreement is related to the change',
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
				description: 'Which Service Level Agreement is related to the change',
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
				description: 'Status of the change',
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
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Short title of the change',
			},
			{
				displayName: 'Type Of Change',
				name: 'changeType',
				type: 'options',
				options: [
					{
						name: 'Normal',
						value: 'Normal',
					},
					{
						name: 'Operational',
						value: 'Operational',
					},
					{
						name: 'Standard',
						value: 'Standard',
					},
				],
				default: 'Normal',
				routing: {
					send: {
						type: 'body',
						property: 'TypeOfChange',
						value: '={{ $value || undefined }}',
					},
				},
				description:
					'Type of the change. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
				description: 'Whether change was read',
			},
			{
				displayName: 'Customer User (ID)',
				name: 'userId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'RequestorLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which customer user (employee) is related to change',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['change'],
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
				resource: ['change'],
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
		displayName: "Record ID (Change)",
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['link'],
				resource: ['change'],
			},
		},
		description: 'RecId value of the change in Ivanti',
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
				resource: ['change'],
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
				resource: ['change'],
			},
		},
		routing: {
			request: {
				url: "=/changes('{{ $parameter['id'] }}')/{{ $parameter['relName'] }}('{{ $value }}')/$Ref",
			},
		},
		description: 'RecId value of the related business object in Ivanti',
	},
];

export const changeFields: INodeProperties[] = [
	...createOperation,
	...deleteOperation,
	...getAllOperation,
	...getOperation,
	...getCountOperation,
	...updateOperation,
	...linkOperation,
];
