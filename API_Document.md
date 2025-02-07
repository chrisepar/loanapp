# API Endpoints
### CRUD Loan Details

<details>
 <summary><code>POST</code> <code><b>/api/loans</b></code> <code>Creates new loan</code></summary>

##### Body

> | name | type | data type | description |
> |-|-|-|-|
> | applicant_name |  required | string   | Applicant's Name  |
> | loaned_amount |  required | decimal   | Amount |
> | status_id |  required | string   | Only accepts values as "APR", "REJ", or "PND"  |

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `201`|`Loan created successfully`|
> | `400`|`{"error": [{"type": "field","msg": "Cannot be empty.","path": "applicant_name","location": "body"}]}`|
> | `500`|`Internal Server Error`|
</details>


<details>
<summary><code>PUT</code> <code><b>/api/loans/:loan_id</b></code> <code>Update's existing loan</code></summary>

##### Parameters

> | name | type | data type | description |
> |-|-|-|-|
> | loan_id |  required | UUID   | Loan Identification  |

##### Body

> | name | type | data type | description |
> |-|-|-|-|
> | applicant_name |  required | string   | Applicant's Name  |
> | loaned_amount |  required | decimal   | Amount |
> | status_id |  required | string   | Only accepts values as "APR", "REJ", or "PND"  |

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `201`|`Loan updated successfully`|
> | `400`|`{"error": [{"type": "field","msg": "Cannot be empty.","path": "applicant_name","location": "body"}]}`|
>| `404`|`{"error": 'no record found'}`|
> | `500`|`Internal Server Error`|

</details>


<details>
<summary><code>DELETE</code> <code><b>/api/loans/:loan_id</b></code> <code>Delete existing loan</code></summary>

##### Parameters

> | name | type | data type | description |
> |-|-|-|-|
> | loan_id |  required | UUID   | Loan Identification  |

##### Body

> None

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `201`|`Loan Deleted successfully`|
> | `400`|`{"error": [{"type": "field","msg": "Cannot be empty.","path": "applicant_name","location": "body"}]}`|
>| `404`|`{"error": 'no record found'}`|
> | `500`|`Internal Server Error`|

</details>


### Get Endpoints


<details>
<summary><code>GET</code> <code><b>/api/loans</b></code> <code>Get All Loans</code></summary>

##### Parameters

> None

##### Body

> None

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `200`| `[{"id":"786d965f-3e2e-4c6f-a3d0-b4bcff425f72","applicant_name":"Test","loaned_amount":"1241","status_description":"APPROVED","status_id":"APR"}]` |
> | `400`|`{"error": [{"type": "field","msg": "Cannot be empty.","path": "applicant_name","location": "body"}]}`|
> | `500`|`Internal Server Error`|

</details>


<details>
<summary><code>GET</code> <code><b>/api/loans/:loan_id</b></code> <code>Get Specific Loan</code></summary>

##### Parameters

> | name | type | data type | description |
> |-|-|-|-|
> | loan_id |  required | UUID   | Loan Identification  |

##### Body

> None

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `200`| `[{"id":"786d965f-3e2e-4c6f-a3d0-b4bcff425f72","applicant_name":"Test","loaned_amount":"1241","status_description":"APPROVED","status_id":"APR"}]` |
> | `400`|`{"error": [{"type": "field","msg": "Cannot be empty.","path": "applicant_name","location": "body"}]}`|
> | `500`|`Internal Server Error`|

</details>



<details>
<summary><code>GET</code> <code><b>/api/loans/status</b></code> <code>Get List of loan status</code></summary>

##### Parameters

> None
##### Body

> None

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `200`| `[{"status_id":"PND","status_description":"PENDING"},{"status_id":"APR","status_description":"APPROVED"},{"status_id":"REJ","status_description":"REJECTED"}]`|
> | `500`|`Internal Server Error`|

</details>



<details>
<summary><code>GET</code> <code><b>/api/loans/summary</b></code> <code>Get Summary of Loans by Status</code></summary>

##### Parameters

> None
##### Body

> None

##### Responses

> | http code | response |
> |-------------------------------------------------|---------------------------------------------------------------------|
> | `200`| `[{"status_description":"PENDING","number_of_loans_per_status":"0","total_loaned_amount_per_status":"0"},{"status_description":"REJECTED","number_of_loans_per_status":"0","total_loaned_amount_per_status":"0"},{"status_description":"APPROVED","number_of_loans_per_status":"1","total_loaned_amount_per_status":"1241"}]`|
> | `500`|`Internal Server Error`|

</details>