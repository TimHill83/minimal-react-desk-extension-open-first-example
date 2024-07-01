import ZOHODESK from "@/types/ZohoDesk/ZohoDesk";

export const  getOrgId = async () => {
    const orgResponse = await ZOHODESK.get('portal.id');
    return orgResponse['portal.id'];
}