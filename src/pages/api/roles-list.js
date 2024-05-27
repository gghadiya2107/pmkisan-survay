// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    const roles = await fetch('https://himparivarservices.hp.gov.in/urban-dept/role/list');
    const roles_list = await roles.json();

    console.log(roles_list, "ASdfqwkdolal")

    res.status(200).json(roles_list)
}
