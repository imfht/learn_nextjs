import {NextResponse} from 'next/server'
import clientPromise from "../../../../lib/mongo";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("openeasm");
        const posts = await db
            .collection("project")
            .aggregate([
  {
    '$match': {
      'name': 'Government of Netherlands'
    }
  }, {
    '$unwind': {
      'path': '$domains'
    }
  }, {
    '$lookup': {
      'from': 'sub_domain',
      'localField': 'domains',
      'foreignField': 'fld',
      'as': 'sub_domains'
    }
  }, {
    '$lookup': {
      'from': 'resolved_ip',
      'localField': 'sub_domains.subdomain',
      'foreignField': 'subdomain',
      'as': 'dns_ip'
    }
  }, {
    '$lookup': {
      'from': 'ip',
      'localField': 'dns_ip.ip_addr',
      'foreignField': 'ip_addr',
      'as': 'ip_info'
    }
  }, {
    '$lookup': {
      'from': 'port',
      'localField': 'dns_ip.ip_addr',
      'foreignField': 'ip_addr',
      'as': 'port_info'
    }
  }, {
    '$addFields': {
      'validSubdomains': {
        '$filter': {
          'input': '$sub_domains',
          'as': 'subdomain',
          'cond': {
            '$eq': [
              '$$subdomain.http_ok', 1
            ]
          }
        }
      }
    }
  }, {
    '$addFields': {
      'asn_info': {
        '$setUnion': '$ip_info.asn'
      }
    }
  }, {
    '$addFields': {
      'dns_ip_size': {
        '$size': '$dns_ip'
      },
      'ip_size': {
        '$size': '$ip_info'
      },
      'subdomain_size': {
        '$size': '$sub_domains'
      },
      'valid_subdomain_size': {
        '$size': '$validSubdomains'
      },
      'port_size': {
        '$size': '$port_info'
      },
      'asn_size': {
        '$size': '$asn_info'
      }
    }
  }, {
    '$unset': [
      'dns_ip', 'ip_info', 'sub_domains', 'port_info', 'validSubdomains', 'asn_info'
    ]
  }
]).sort({'subdomain_size':-1}).limit(10)
            .toArray();
        return NextResponse.json({data: posts})
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}

export async function POST(request) {
    return NextResponse.json({revalidated: true})
}