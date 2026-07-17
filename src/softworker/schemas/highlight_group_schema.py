from typing import List, Optional
from pydantic import Field
from softworker.schemas.base_schema import ResumeBaseModel
from softworker.schemas.highlight_schema import HighlightSchema


class HighlightGroupSchema(ResumeBaseModel):
    title: Optional[str] = None
    items: List[HighlightSchema] = Field(default_factory=list)
